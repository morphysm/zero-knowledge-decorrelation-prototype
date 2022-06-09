package github

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type Client interface {
	GetAccessToken(code string) string
	GetRedirectURL(callbackUrl string) string
	GetUser(accessToken string) (string, error)
}

// githubClient represents a GitHub client.
type client struct {
	clientID string
	// TODO memmory encript 
	clientSecret string
}

func NewClient(clientID string, clientSecret string) Client {
	return &client{
		clientID: clientID,
		clientSecret: clientSecret,
	}
}

func (c *client) GetRedirectURL(callbackUrl string) string {
	return fmt.Sprintf(
        "https://github.com/login/oauth/authorize?client_id=%s&redirect_uri=%s",
        c.clientID,
        callbackUrl,
    )
}


// TODO rework this to be cogruent with fame-github-backend
func (c *client) GetAccessToken(code string) string {
    // Set us the request body as JSON
    requestBodyMap := map[string]string{
        "client_id": c.clientID,
        "client_secret": c.clientSecret,
        "code": code,
    }
    requestJSON, _ := json.Marshal(requestBodyMap)

    // POST request to set URL
    req, reqerr := http.NewRequest(
        "POST",
        "https://github.com/login/oauth/access_token",
        bytes.NewBuffer(requestJSON),
    )
    if reqerr != nil {
        log.Panic("Request creation failed")
    }
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Accept", "application/json")

    // Get the response
    resp, resperr := http.DefaultClient.Do(req)
    if resperr != nil {
        log.Panic("Request failed")
    }

    // Response body converted to stringified JSON
    respbody, _ := ioutil.ReadAll(resp.Body)

    // Represents the response received from Github
    type githubAccessTokenResponse struct {
        AccessToken string `json:"access_token"`
        TokenType   string `json:"token_type"`
        Scope       string `json:"scope"`
    }

    // Convert stringified JSON to a struct object of type githubAccessTokenResponse
    var ghresp githubAccessTokenResponse
    json.Unmarshal(respbody, &ghresp)

    // Return the access token (as the rest of the
    // details are relatively unnecessary for us)
    return ghresp.AccessToken
}

// TODO rework this to be cogruent with fame-github-backend
func (c *client) GetUser(accessToken string) (string, error) {
    // Get request to a set URL
    req, reqerr := http.NewRequest(
        "GET",
        "https://api.github.com/user",
        nil,
    )
    if reqerr != nil {
        return "", errors.New("API Request creation failed")
    }

    // Set the Authorization header before sending the request
    // Authorization: token XXXXXXXXXXXXXXXXXXXXXXXXXXX
    authorizationHeaderValue := fmt.Sprintf("token %s", accessToken)
    req.Header.Set("Authorization", authorizationHeaderValue)

    // Make the request
    resp, resperr := http.DefaultClient.Do(req)
    if resperr != nil {
		return "", errors.New("request failed")
    }

    // Read the response as a byte slice
    respbody, _ := ioutil.ReadAll(resp.Body)

    // Convert byte slice to string and return
    return string(respbody), nil
}

