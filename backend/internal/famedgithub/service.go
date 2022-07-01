package famedgithub

import (
	"context"
	"time"
)

type Client interface {
	GetOwnedRepos(ctx context.Context, userLogin string) []Repo
	GetProposedRewardsByRepo(ctx context.Context, repoName string) []Reward

	GetProposedRewardsByUser(ctx context.Context, repoName string) []Reward
}

type client struct{}

func NewClient() Client {
	return &client{}
}

type Repo struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

// GetOwnedRepos returns all famed enabled reposed owned by a user.
func (c *client) GetOwnedRepos(ctx context.Context, userLogin string) []Repo {
	mockResponse := []Repo{{Name: "MockRepo1", URL: "https://github.com/"}, {Name: "MockRepo2", URL: "https://github.com/"}}

	return mockResponse
}

type Reward struct {
	ID string `json:"id"`
	// SuggestedReward could be monetary value or NFT, to be defined
	SuggestedReward string    `json:"suggestedReward"`
	Date            time.Time `json:"date"`
	URL             string    `json:"url"`
}

// GetProposedRewardsByRepo returns the list of rewards proposed by the fame protocol of a repo.
func (c *client) GetProposedRewardsByRepo(ctx context.Context, repoName string) []Reward {
	mockResponse := []Reward{
		{
			ID:              "1",
			SuggestedReward: "NFT_1",
			Date:            time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
			URL:             "https://github.com/",
		},
		{
			ID:              "2",
			SuggestedReward: "NFT_2",
			Date:            time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
			URL:             "https://github.com/",
		},
		{
			ID:              "3",
			SuggestedReward: "NFT_3",
			Date:            time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
			URL:             "https://github.com/",
		},
		{
			ID:              "4",
			SuggestedReward: "NFT_4",
			Date:            time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
			URL:             "https://github.com/",
		},
	}

	return mockResponse
}

// GetProposedRewardsByUser returns the list of rewards proposed by the fame protocol of a user.
func (c *client) GetProposedRewardsByUser(ctx context.Context, repoName string) []Reward {
	mockResponse := []Reward{
		{
			ID:              "2",
			SuggestedReward: "NFT_2",
			Date:            time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
			URL:             "https://github.com/",
		},
		{
			ID:              "4",
			SuggestedReward: "NFT_4",
			Date:            time.Date(2000, time.January, 1, 0, 0, 0, 0, time.UTC),
			URL:             "https://github.com/",
		},
	}

	return mockResponse
}
