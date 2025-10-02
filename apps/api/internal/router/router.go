package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jimvid/simply-climbing/config"
	"github.com/jimvid/simply-climbing/internal/api/climbs"
	"github.com/jimvid/simply-climbing/internal/database"
	"github.com/jimvid/simply-climbing/internal/middleware"
)

func NewRouter(cfg *config.Config) *chi.Mux {

	r := chi.NewRouter()
	db := database.NewDynamoDB()

	// Climbs
	climbStorage := climbs.NewClimbStorage(db, cfg)
	climbService := climbs.NewClimbService(climbStorage)
	climbHandler := climbs.NewClimbHandler(climbService)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	}))
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)
	r.Use(chimiddleware.RequestID)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	r.With(middleware.AuthMiddleware).Post("/climbs", climbHandler.Create)

	return r
}
