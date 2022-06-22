package ethereum

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"

	airdrop "github.com/famed-airdrop-prototype/backend/internal/ethereum/privateairdrop"
)

type Client interface {
	PostMerkleRoot(ctx context.Context, root []byte) error
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

func (c *client) PostMerkleRoot(ctx context.Context, root []byte) error {
	// TODO check why this worked with the old scripts
	// if len(root) != 32 {
	// 	log.Printf("root is %d not 32 bytes", len(root))
	// 	return fmt.Errorf("root is %d not 32 bytes", len(root))
	// }


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
	copy(root32[:], root)

    tx, err := instance.UpdateRoot(auth, root32)
    if err != nil {
		log.Printf("error updating merkle root: %v", err)
        return err
    }

    fmt.Printf("tx sent: %s \n", tx.Hash().Hex())

	//TODO check if executed
    result, err := instance.Root(nil)
	if err != nil {
		log.Printf("error reading merkle root: %v", err)
        return err
    }
   
    log.Printf("new root: %s", string(result[:]))
	return nil
}