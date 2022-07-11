package famedgithub

import (
	"context"
	"fmt"
	"net/http"
)

// GetRewardsByOwner returns a list of rewards for a given owner as bytes.
func (c *client) GetRewardsByOwner(ctx context.Context, owner string) ([]byte, error) {
	var bytes []byte
	_, err := c.execute(ctx, http.MethodGet, fmt.Sprintf("owners/%s/rewards", owner), nil, &bytes)
	return bytes, err
}

// GetRewardsByContributor returns a list of rewards for a given contributor as bytes.
func (c *client) GetRewardsByContributor(ctx context.Context, contributor string) ([]byte, error) {
	var bytes []byte
	_, err := c.execute(ctx, http.MethodGet, fmt.Sprintf("contributors/%s/rewards", contributor), nil, &bytes)
	return bytes, err
}
