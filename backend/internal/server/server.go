package server

import (
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/famed-airdrop-prototype/backend/internal/airdrop"
	"github.com/famed-airdrop-prototype/backend/internal/config"
	"github.com/famed-airdrop-prototype/backend/internal/ethereum"
	"github.com/famed-airdrop-prototype/backend/internal/famedgithub"
	"github.com/famed-airdrop-prototype/backend/internal/github"
	"github.com/famed-airdrop-prototype/backend/internal/health"
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
	e.Use(
		middleware.CORSWithConfig(middleware.CORSConfig{
			// TODO set depending on development or production via config
			AllowOrigins:     []string{"http://localhost:3000", "https://famed-zk-prototype.vercel.app"},
			AllowCredentials: true,
			AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
			AllowMethods:     []string{"GET", "POST"},
		}),
		middleware.Logger(),
		middleware.Recover(),
	)

	// TODO set via config
	// New famedGithubClient client; handles request to the famed-github-backend
	famedGithubClient := famedgithub.NewClient(cfg.Famed.URL)
	// New GitHub client; handles requests to GitHub
	githubClient := github.NewClient(cfg.Github.ClientID, cfg.Github.ClientSecret)
	// New Ethereum client; handles requests to a L1 or L2
	ethClient, err := ethclient.Dial(cfg.Ethereum.RPCEndpoint)
	if err != nil {
		return nil, err
	}
	ethereumClient := ethereum.NewClient(ethClient, cfg.Ethereum.Address, cfg.Ethereum.PrivateKey, cfg.Ethereum.AirdropAddress)

	// Airdrop endpoints exposed for airdrop I/O
	airdropGroup := e.Group("/airdrop")
	{
		AirdropRoutes(
			airdropGroup, airdrop.NewHandler(famedGithubClient, githubClient, ethereumClient),
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
