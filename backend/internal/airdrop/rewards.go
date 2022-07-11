package airdrop

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type authenticatedRequest struct {
	BearerToken string `header:"Authorization" validate:"required"`
}

func (a *airdropHandler) GetRewardsByUser(c echo.Context) error {
	ctx := c.Request().Context()

	var payload authenticatedRequest
	if err := (&echo.DefaultBinder{}).BindHeaders(c, &payload); err != nil {
		return err
	}

	if err := c.Validate(payload); err != nil {
		return err
	}

	token := strings.Replace(payload.BearerToken, "Bearer ", "", -1)
	user, err := a.gitHubClient.GetUser(ctx, token)
	if err != nil {
		return err
	}

	rewards, err := a.famedGitHubClient.GetRewardsByContributor(ctx, user.Login)
	if err != nil {
		return err
	}

	return c.JSONBlob(http.StatusOK, rewards)
}

func (a *airdropHandler) GetRewardsByOwner(c echo.Context) error {
	ctx := c.Request().Context()

	// TODO replace body with header
	var payload authenticatedRequest
	if err := (&echo.DefaultBinder{}).BindHeaders(c, &payload); err != nil {
		return err
	}

	if err := c.Validate(payload); err != nil {
		return err
	}

	token := strings.Replace(payload.BearerToken, "Bearer ", "", -1)
	user, err := a.gitHubClient.GetUser(ctx, token)
	if err != nil {
		return err
	}

	rewards, err := a.famedGitHubClient.GetRewardsByOwner(ctx, user.Login)
	if err != nil {
		return err
	}

	return c.JSONBlob(http.StatusOK, rewards)
}
