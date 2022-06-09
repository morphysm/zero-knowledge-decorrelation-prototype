package config

import (
	"errors"
	"os"
)

type Config struct {
	App struct {
		Host string
		Port string
	}

	Github struct {
		ClientID string
		ClientSecret string
	}
}

func Load() (*Config, error) {
	cfg := Config{
		App: struct {
			Host string
			Port string
		}{
			Host: "127.0.0.1",
			Port: "8080",
		}}

	githubClientID, ok := os.LookupEnv("CLIENT_ID")
    if !ok {
        return nil, errors.New("GitHub client id not found in .env file")
    }

	cfg.Github.ClientID = githubClientID;

	githubClientSecret, ok := os.LookupEnv("CLIENT_SECRET")
    if !ok {
        return nil, errors.New("GitHub client secret not found in .env file")
    }

	cfg.Github.ClientSecret = githubClientSecret;

	return &cfg, nil
}


