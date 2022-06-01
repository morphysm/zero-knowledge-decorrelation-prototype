package airdrop

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type HTTPHandler interface {
	PostPreCommitment(c echo.Context) error
}

// airdropHandler represents the handler for the airdrop endpoints.
type airdropHandler struct{}

// NewHandler returns a pointer to the airdrop handler.
func NewHandler() HTTPHandler {
	return &airdropHandler{}
}

// PostPreCommitment returns a json with the final commit
func (healthHandler *airdropHandler) PostPreCommitment(c echo.Context) error {
	return c.NoContent(http.StatusOK)
}
