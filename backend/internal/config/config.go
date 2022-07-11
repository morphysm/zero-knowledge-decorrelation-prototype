package config

import (
	"crypto/ecdsa"
	"errors"
	"fmt"
	"os"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)

type Config struct {
	App struct {
		Host string
		Port string
	}

	Github struct {
		ClientID     string
		ClientSecret string
	}

	Ethereum struct {
		RPCEndpoint    string
		PrivateKey     *ecdsa.PrivateKey
		PublicKeyECDSA *ecdsa.PublicKey
		Address        common.Address
		AirdropAddress common.Address
	}
}

func Load() (*Config, error) {
	cfg := Config{
		App: struct {
			Host string
			Port string
		}{
			Host: "127.0.0.1",
			Port: "8081",
		}}

	githubClientID, ok := os.LookupEnv("CLIENT_ID")
	if !ok {
		return nil, errors.New("GitHub client id not found in .env file")
	}

	cfg.Github.ClientID = githubClientID

	githubClientSecret, ok := os.LookupEnv("CLIENT_SECRET")
	if !ok {
		return nil, errors.New("GitHub client secret not found in .env file")
	}

	cfg.Github.ClientSecret = githubClientSecret

	ethereumRPCEndpoint, ok := os.LookupEnv("ETHREUM_RPC")
	if !ok {
		return nil, errors.New("Ethereum rpc endpoint not found in .env file")
	}

	cfg.Ethereum.RPCEndpoint = ethereumRPCEndpoint

	ethereumPrivateKey, ok := os.LookupEnv("ETHEREUM_PRIVATE_KEY")
	if !ok {
		return nil, errors.New("Ethereum private key not found in .env file")
	}

	privateKey, err := crypto.HexToECDSA(ethereumPrivateKey)
	cfg.Ethereum.PrivateKey = privateKey
	if err != nil {
		return nil, fmt.Errorf("error while converting private key to an ECDSA: %v", err)
	}

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		return nil, fmt.Errorf("error while casting public key to an ECDSA: %v", err)
	}

	address := crypto.PubkeyToAddress(*publicKeyECDSA)
	cfg.Ethereum.Address = address

	airdropAddress, ok := os.LookupEnv("ETHEREUM_AIRDROP_ADDRESS")
	if !ok {
		return nil, errors.New("aidrop address not found in .env file")
	}
	cfg.Ethereum.AirdropAddress = common.HexToAddress(airdropAddress)

	return &cfg, nil
}
