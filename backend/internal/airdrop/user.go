package airdrop

import (
	"github.com/labstack/echo/v4"
	"net/http"
	"strings"
)

func (a *airdropHandler) GetUser(c echo.Context) error {
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

	return c.JSON(http.StatusOK, user)
}
