package server

import (
	"github.com/labstack/echo/v4"

	"github.com/famed-airdrop-prototype/backend/internal/airdrop"
	"github.com/famed-airdrop-prototype/backend/internal/config"
	"github.com/famed-airdrop-prototype/backend/internal/health"
)

// NewServer returns an echo server with default configuration
func newServer() *echo.Echo {
	return echo.New()
}

// NewBackendServer instantiates new application Echo server.
func NewBackendServer(cfg *config.Config) (*echo.Echo, error) {
	e := newServer()

	// Middleware
	// e.Use(
	// 	middleware.CORSWithConfig(middleware.CORSConfig{
	// 		AllowOrigins: []string{"https://www.famed.morphysm.com", "https://famed.morphysm.com"},
	// 		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	// 	}),
	// 	middleware.Logger(),
	// )


	// Airdrop endpoints exposed for airdrop I/O
	airdropGroup := e.Group("/airdrop")
	{
		AirdropRoutes(
			airdropGroup, airdrop.NewHandler(),
		)
	}
	// Health endpoints exposed for heartbeat
	healthGroup := e.Group("/health")
	{
		HealthRoutes(
			healthGroup, health.NewHandler(),
		)
	}

	return e, nil
}