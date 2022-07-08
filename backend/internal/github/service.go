package github

import (
	"context"
)

type Client interface {
	GetUser(ctx context.Context, accessToken string) (User, error)
}

// githubClient represents a GitHub client.
type client struct {
	clientID string
	// TODO memmory encript
	clientSecret string
}

func NewClient(clientID string, clientSecret string) Client {
	return &client{
		clientID:     clientID,
		clientSecret: clientSecret,
	}
}
