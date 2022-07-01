package airdrop

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"

	"github.com/famed-airdrop-prototype/backend/internal/famedgithub"
	"github.com/famed-airdrop-prototype/backend/internal/github"
)

type rewardRequest struct {
	BearerToken string `header:"Authorization" validate:"required"`
}

// TODO fill this response with data
type userRewardsResponse struct {
	User    github.User          `json:"user"`
	Rewards []famedgithub.Reward `json:"rewards"`
}

// TODO add GitHub backend query behaviour
func (a *airdropHandler) GetRewardsByUser(c echo.Context) error {
	ctx := c.Request().Context()

	// TODO replace body with header
	var payload rewardRequest
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

	rewardResponse := userRewardsResponse{
		User:    user,
		Rewards: a.famedGitHubClient.GetProposedRewardsByUser(ctx, user.Login),
	}
	return c.JSON(http.StatusOK, rewardResponse)
}

type repoRewardsResponse struct {
	Repos []repoRewards `json:"repos"`
}

type repoRewards struct {
	Name    string               `json:"name"`
	Rewards []famedgithub.Reward `json:"rewards"`
}

// TODO add GitHub backend query behaviour
func (a *airdropHandler) GetRewardsByRepo(c echo.Context) error {
	ctx := c.Request().Context()

	// TODO replace bode with header
	var payload rewardRequest
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

	repos := a.famedGitHubClient.GetOwnedRepos(ctx, user.Login)
	rewardResponse := repoRewardsResponse{}
	for _, repo := range repos {
		rewardResponse.Repos = append(rewardResponse.Repos, repoRewards{
			Name:    repo.Name,
			Rewards: a.famedGitHubClient.GetProposedRewardsByRepo(ctx, repo.Name),
		})
	}

	return c.JSON(http.StatusOK, rewardResponse)
}
