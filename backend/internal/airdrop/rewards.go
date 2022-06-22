package airdrop

import (
	"net/http"
	"strings"
	"time"

	"github.com/labstack/echo/v4"

	"github.com/famed-airdrop-prototype/backend/internal/github"
)

	

type rewardRequest struct {
	BearerToken string `header:"Authorization" validate:"required"`
}

// TODO fill this response with data
type rewardResponse struct {
	User github.User `json:"user"`
	Rewards []Reward `json:"rewards"`
}

type Reward struct {
	// TODO can we determine if a reward was paid out?
	Paid bool `json:"paid"`
	ID string `json:"id"`
	// Value could be monetary value or NFT, to be defined
	Value string `json:"value"`
	Date   time.Time `json:"date"`
	URL    string    `json:"url"`
}

func (a *airdropHandler) GetRewards(c echo.Context) error {
	// TODO replace bode with header
	var payload rewardRequest
	if err := (&echo.DefaultBinder{}).BindHeaders(c, &payload); err != nil {
		return err
	}

	if err := c.Validate(payload); err != nil {
		return err
    }

	token := strings.Replace(payload.BearerToken, "Bearer ", "", -1)
	user, err := a.gitHubClient.GetUser(c.Request().Context(), token)
	if err != nil {
		return err
	}

	rewardResponse := rewardResponse{
		User: user,
		Rewards: []Reward{
			{ 
				Paid: false,
				ID: "1",
				Value: "1000 Coins",
				Date: time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
				URL: "https://github.com/",
			},
			{ 
				Paid: false,
				ID: "2",
				Value: "1000 Coins",
				Date: time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
				URL: "https://github.com/",
			},
			{ 
				Paid: false,
				ID: "3",
				Value: "1000 Coins",
				Date: time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
				URL: "https://github.com/",
			},
		},
	}
	return c.JSON(http.StatusOK, rewardResponse)
}