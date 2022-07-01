package airdrop

import (
	"github.com/famed-airdrop-prototype/backend/internal/ethereum"
	"github.com/famed-airdrop-prototype/backend/internal/famedgithub"
	"github.com/famed-airdrop-prototype/backend/internal/github"

	"github.com/labstack/echo/v4"
)

type HTTPHandler interface {
	GetRewardsByUser(c echo.Context) error
	GetRewardsByRepo(c echo.Context) error

	GetZkey(c echo.Context) error
	GetPublicCommitments(c echo.Context) error
	GetWasm(c echo.Context) error

	PostPreCommitment(c echo.Context) error
}

// airdropHandler represents the handler for the airdrop endpoints.
type airdropHandler struct {
	famedGitHubClient famedgithub.Client
	gitHubClient      github.Client
	ethClient         ethereum.Client
}

// NewHandler returns a pointer to the airdrop handler.
func NewHandler(famedGitHubClient famedgithub.Client, gitHubClient github.Client, ethClient ethereum.Client) HTTPHandler {
	return &airdropHandler{
		famedGitHubClient: famedGitHubClient,
		gitHubClient:      gitHubClient,
		ethClient:         ethClient,
	}
}
