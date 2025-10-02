package climbs

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
)

type ClimbHandler struct {
	service *ClimbService
}

func NewClimbHandler(service *ClimbService) *ClimbHandler {
	return &ClimbHandler{
		service: service,
	}
}
func (h *ClimbHandler) writeErrorResponse(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func (h *ClimbHandler) writeSuccessResponse(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

func (h *ClimbHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	climbs := []ClimbModel{}

	climbs = append(climbs, ClimbModel{
		ID:    "some-uuid",
		Grade: "7A",
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(climbs)
}

func (h *ClimbHandler) Create(w http.ResponseWriter, r *http.Request) {
	var climb ClimbModel
	err := json.NewDecoder(r.Body).Decode(&climb)
	if err != nil {
		slog.Error("Failed to parse JSON", "error", err)
		h.writeErrorResponse(w, http.StatusBadRequest, "Could not parse JSON")
		return
	}

	// Get claims from clerk
	claims, ok := clerk.SessionClaimsFromContext(r.Context())
	if !ok {
		slog.Warn("No session claims in context")
		h.writeErrorResponse(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	// Get user from claims
	usr, err := user.Get(r.Context(), claims.Subject)
	if err != nil {
		slog.Error("Failed to get user from Clerk", "error", err, "subject", claims.Subject)
		h.writeErrorResponse(w, http.StatusInternalServerError, "Could not get user")
		return
	}
	climb.UserId = usr.ID

	out, err := h.service.Create(climb)
	if err != nil {
		slog.Error("Failed to create climb", "error", err, "userId", climb.UserId)
		h.writeErrorResponse(w, http.StatusInternalServerError, "Could not create climb")
		return
	}

	slog.Info("Climb created", "climbId", out.ID, "userId", out.UserId)
	h.writeSuccessResponse(w, http.StatusCreated, out)
}
