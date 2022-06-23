package airdrop

import (
	"github.com/famed-airdrop-prototype/backend/internal/database"
	"github.com/famed-airdrop-prototype/backend/internal/ethereum"
	"github.com/famed-airdrop-prototype/backend/internal/github"

	"github.com/labstack/echo/v4"
)

type HTTPHandler interface {
	PostPreCommitment(c echo.Context) error
	GetRewards(c echo.Context) error 
	GetZkey(c echo.Context) error
	GetPublicCommitments(c echo.Context) error
	GetWasm(c echo.Context) error
}

// airdropHandler represents the handler for the airdrop endpoints.
type airdropHandler struct{
	gitHubClient github.Client
	ethClient ethereum.Client
	db database.Database
}

// NewHandler returns a pointer to the airdrop handler.
func NewHandler(gitHubClient github.Client, ethClient ethereum.Client, db database.Database) HTTPHandler {
	return &airdropHandler{gitHubClient: gitHubClient, ethClient: ethClient, db: db}
}