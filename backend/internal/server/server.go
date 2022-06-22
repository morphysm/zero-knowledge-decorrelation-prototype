package server

import (
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/famed-airdrop-prototype/backend/internal/airdrop"
	"github.com/famed-airdrop-prototype/backend/internal/config"
	"github.com/famed-airdrop-prototype/backend/internal/ethereum"
	"github.com/famed-airdrop-prototype/backend/internal/github"
	"github.com/famed-airdrop-prototype/backend/internal/health"
	"github.com/famed-airdrop-prototype/backend/internal/login"
)

// NewServer returns an echo server with default configuration
func newServer() *echo.Echo {
	return echo.New()
}

// NewBackendServer instantiates new application Echo server.
func NewBackendServer(cfg *config.Config) (*echo.Echo, error) {
	e := newServer()

	e.Validator = &CustomValidator{validator: validator.New()}

	// Middleware
	// TODO set correct frontend URLS
	e.Use(
		middleware.CORSWithConfig(middleware.CORSConfig{
			//TODO set depending on development or production
			AllowOrigins: []string{"http://localhost:3000"},
			AllowCredentials: true,
			AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
			AllowMethods: []string{"GET", "POST"},
		}),
		middleware.Logger(),
		middleware.Recover(),
	)

	// New GitHub client; handels requests to GitHub
	githubClient := github.NewClient(cfg.Github.ClientID, cfg.Github.ClientSecret)
	// New Ethereum client; handels requests to a L1 or L2
	ethClient, err := ethclient.Dial(cfg.Ethereum.RPCEndpoint)
	if err != nil {
		return nil, err
	}
	ethereumClient := ethereum.NewClient(ethClient, cfg.Ethereum.Address, cfg.Ethereum.PrivateKey, cfg.Ethereum.AirdropAddress)

	// Login endpoints exposed for login with GitHub
	loginGroup := e.Group("/login")
	{
		LoginRoutes(
			loginGroup, login.NewHandler(githubClient),
		)
	}
	// Airdrop endpoints exposed for airdrop I/O
	airdropGroup := e.Group("/airdrop")
	{
		AirdropRoutes(
			airdropGroup, airdrop.NewHandler(githubClient, ethereumClient),
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