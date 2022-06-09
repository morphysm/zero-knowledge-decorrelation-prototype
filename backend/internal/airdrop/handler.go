package airdrop

import (
	"github.com/famed-airdrop-prototype/backend/internal/github"
	"github.com/labstack/echo/v4"
)

type HTTPHandler interface {
	PostPreCommitment(c echo.Context) error
	GetRewards(c echo.Context) error 
}

// airdropHandler represents the handler for the airdrop endpoints.
type airdropHandler struct{
	client github.Client
}

// NewHandler returns a pointer to the airdrop handler.
func NewHandler(client github.Client) HTTPHandler {
	return &airdropHandler{client: client}
}