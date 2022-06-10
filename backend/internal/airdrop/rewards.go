package airdrop

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type rewardRequest struct {
	AccessToken string `header:"Authorization" validate:"required"`
}

// TODO fill this response with data
type rewardResponse struct {
	User string `json:"user"`
	Rewards []Reward `json:"rewards"`
}

type Reward struct {
	// TODO can we determine if a reward was paid out?
	Paid bool `json:"paid"`
	ID string `json:"id"`
	// Value could be monetary value or NFT, to be defined
	Value string `json:"value"`
}

func (a *airdropHandler) GetRewards(c echo.Context) error {
	// TODO replace bode with header
	var body rewardRequest
	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(body); err != nil {
		return err
    }

	user, err := a.client.GetUser(body.AccessToken)
	if err != nil {
		return err
	}

	rewardResponse := rewardResponse{User: user}
	return c.JSON(http.StatusOK, rewardResponse)
}