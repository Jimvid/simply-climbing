package user

import (
	"encoding/json"
	"lambda-dropin/internal/jwt"
	"net/http"
)

type UserHandler struct {
	userService *UserService
}

func NewUserHandler(userService *UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

// Helper function to write JSON error responses
func (h *UserHandler) writeErrorResponse(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

// Helper function to write JSON success responses
func (h *UserHandler) writeSuccessResponse(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

func (h *UserHandler) RegisterUserHandler(w http.ResponseWriter, r *http.Request) {
	var userRequest UserRequest

	// Parse JSON from request body
	err := json.NewDecoder(r.Body).Decode(&userRequest)
	if err != nil {
		h.writeErrorResponse(w, http.StatusBadRequest, "Invalid request body")
		return
	}
	defer r.Body.Close()

	// Validate required fields
	if userRequest.Username == "" || userRequest.Password == "" {
		h.writeErrorResponse(w, http.StatusBadRequest, "Username and password cannot be empty")
		return
	}

	// Check if user already exists
	userExists, err := h.userService.DoesUserExist(userRequest.Username)
	if err != nil {
		h.writeErrorResponse(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	if userExists {
		h.writeErrorResponse(w, http.StatusConflict, "User already exists")
		return
	}

	// Create new user with hashed password
	newUser, err := h.userService.NewUserWithHashedPassword(userRequest)
	if err != nil {
		h.writeErrorResponse(w, http.StatusInternalServerError, "Could not create user")
		return
	}

	// Insert user into database
	err = h.userService.InsertUser(newUser)
	if err != nil {
		h.writeErrorResponse(w, http.StatusInternalServerError, "Error saving user")
		return
	}

	// Return success response
	h.writeSuccessResponse(w, http.StatusCreated, map[string]string{
		"message":  "User created successfully",
		"username": newUser.Username,
	})
}

func (h *UserHandler) LoginUserHandler(w http.ResponseWriter, r *http.Request) {
	var loginRequest UserRequest

	// Parse JSON from request body
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		h.writeErrorResponse(w, http.StatusBadRequest, "Invalid request body")
		return
	}
	defer r.Body.Close()

	// Validate required fields
	if loginRequest.Username == "" || loginRequest.Password == "" {
		h.writeErrorResponse(w, http.StatusBadRequest, "Username and password are required")
		return
	}

	// Get user from database
	user, err := h.userService.GetUser(loginRequest.Username)
	if err != nil {
		h.writeErrorResponse(w, http.StatusUnauthorized, "Invalid credentials")
		return
	}

	// Validate password
	if !h.userService.ValidatePassword(user.PasswordHash, loginRequest.Password) {
		h.writeErrorResponse(w, http.StatusUnauthorized, "Invalid credentials")
		return
	}

	// Create access token
	accessToken, err := jwt.CreateToken(user)
	if err != nil {
		h.writeErrorResponse(w, http.StatusInternalServerError, "Could not create access token")
		return
	}

	// Return success response with token
	h.writeSuccessResponse(w, http.StatusOK, map[string]string{
		"access_token": accessToken,
		"token_type":   "Bearer",
	})
}
