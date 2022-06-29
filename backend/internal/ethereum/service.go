package ethereum

import (
	"context"
	"crypto/ecdsa"
	"encoding/hex"
	"fmt"
	"log"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"

	airdrop "github.com/famed-airdrop-prototype/backend/internal/ethereum/privateairdrop"
)

type Client interface {
	PostMerkleRoot(ctx context.Context, hexMerkleRoot string) error
}

// githubClient represents a GitHub client.
type client struct {
	ethClient *ethclient.Client
	accountAddress common.Address
	privateKey *ecdsa.PrivateKey
	aiddropAddress common.Address
}

func NewClient(ethClient *ethclient.Client, accountAddress common.Address, privateKey *ecdsa.PrivateKey, aiddropAddress common.Address) Client {
	return &client{
		ethClient: ethClient,
		accountAddress: accountAddress,
		privateKey: privateKey,
		aiddropAddress: aiddropAddress,
	}
}

func (c *client) PostMerkleRoot(ctx context.Context, hexMerkleRoot string) error {
	// Transform hex string to bytes
	merkleRoot, err := hexToBytes(hexMerkleRoot)
	if err != nil {
		log.Printf("error transforming hex string to bytes", err)
		return err
	}

	// Check bytes length to be 32 
	if len(merkleRoot) != 32 {
		log.Printf("root is %d not 32 bytes", len(merkleRoot))
		return fmt.Errorf("root is %d not 32 bytes", len(merkleRoot))
	}

	nonce, err := c.ethClient.PendingNonceAt(context.Background(), c.accountAddress)
	if err != nil {
		log.Printf("error while generating nonce: %v", err)
		return err
	}

	gasPrice, err := c.ethClient.SuggestGasPrice(context.Background())
	if err != nil {
		log.Printf("error while suggesting gas price: %v", err)
		return err
	}

	auth := bind.NewKeyedTransactor(c.privateKey)
    auth.Nonce = big.NewInt(int64(nonce))
    auth.Value = big.NewInt(0)     // in wei
    auth.GasLimit = uint64(300000) // in units
    auth.GasPrice = gasPrice

	instance, err := airdrop.NewPrivateairdrop(c.aiddropAddress, c.ethClient)
    if err != nil {
		log.Printf("error creating airdrop instance: %v", err)
        return err
    }

	var root32 [32]byte
	copy(root32[:], merkleRoot)
    tx, err := instance.UpdateRoot(auth, root32)
    if err != nil {
		log.Printf("error updating merkle root: %v", err)
        return err
    }

    fmt.Printf("tx sent: %s \n", tx.Hash().Hex())

	// Wait for the transaction to finalize.
	_, err = bind.WaitMined(ctx, c.ethClient, tx)
	    if err != nil {
		log.Printf("error while waiting for transaction to finalize: %v", err)
        return err
    }

	// Check if root update executed correctly
    result, err := instance.Root(nil)
	if err != nil {
		log.Printf("error reading merkle root: %v", err)
        return err
    }

	// Check if updated root equals new root
	contractMTRoot := fmt.Sprintf("0x%s", hex.EncodeToString(result[:]))
	log.Printf("new root: %s", contractMTRoot)

	if (contractMTRoot != hexMerkleRoot) {
		log.Printf("contract merkle root %s does not match new merkletree root %s", contractMTRoot, hexMerkleRoot)
        return fmt.Errorf("contract merkle root %s does not match new merkletree root %s", contractMTRoot, hexMerkleRoot)
	}
    
	return nil
}

func hexToBytes(s string) ([]byte, error){
	// Trim potential 0x prefix
	s = strings.TrimPrefix(s, "0x")
	return hex.DecodeString(s)
}