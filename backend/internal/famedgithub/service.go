package famedgithub

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
)

type Client interface {
	GetRewardsByOwner(ctx context.Context, repoName string) ([]byte, error)
	GetRewardsByContributor(ctx context.Context, repoName string) ([]byte, error)
}

// client
type client struct {
	baseURL string
	//apiKey    string
	//apiSecret string
	client *http.Client
}

// NewClient returns a new instance of the famed-github-backend client.
func NewClient(baseURL string) Client {
	return &client{
		baseURL: baseURL,
		client:  http.DefaultClient,
	}
}

// execute executes a http request.
func (c *client) execute(ctx context.Context, method string, path string, obj interface{}, bytes *[]byte) (*http.Response, error) {
	// Prepare request to send
	req, err := http.NewRequestWithContext(ctx, method, c.baseURL+path, nil)
	if err != nil {
		return nil, err
	}

	// Set headers
	req.Header.Add(http.CanonicalHeaderKey("Accept"), "application/json;version=1")
	if method == http.MethodPost || method == http.MethodPut || method == http.MethodPatch {
		req.Header.Add(http.CanonicalHeaderKey("Content-Type"), "application/json;charset=UTF-8")
	}

	// Send the request
	// TODO Add status code check
	resp, err := c.client.Do(req)
	if err != nil {
		return resp, err
	}

	defer resp.Body.Close()
	if bytes != nil {
		*bytes, err = io.ReadAll(resp.Body)
		if err != nil {
			return resp, err
		}
	}

	if obj != nil {
		// Decode the response body
		decoder := json.NewDecoder(resp.Body)
		err = decoder.Decode(&obj)
		if err != nil {
			return resp, err
		}
	}

	return resp, err
}
