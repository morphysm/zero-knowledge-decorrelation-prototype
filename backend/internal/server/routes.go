package server

import (
	"github.com/labstack/echo/v4"

	"github.com/famed-airdrop-prototype/backend/internal/airdrop"
	"github.com/famed-airdrop-prototype/backend/internal/health"
)

//AirdropRoutes defines endpoints exposed to serve airdrop requests.
func AirdropRoutes(g *echo.Group, handler airdrop.HTTPHandler) {
	g.POST("/precommit", handler.PostPreCommitment)
}

// HealthRoutes defines endpoints exposed to serve uses cases of infrastructure and customer support.
func HealthRoutes(g *echo.Group, handler health.HTTPHandler) {
	g.GET("", handler.GetHealth)
}
