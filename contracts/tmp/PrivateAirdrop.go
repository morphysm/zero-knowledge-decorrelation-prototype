// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package privateairdrop

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// PrivateairdropMetaData contains all meta data concerning the Privateairdrop contract.
var PrivateairdropMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"contractIZekoGenerativeNFT\",\"name\":\"_nftToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amountPerRedemption\",\"type\":\"uint256\"},{\"internalType\":\"contractIPlonkVerifier\",\"name\":\"_verifier\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"_root\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"amountPerRedemption\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"proof\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"nullifierHash\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"rewardID\",\"type\":\"bytes32\"}],\"name\":\"collectAirdrop\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nextTokenIdToBeAirdropped\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nftToken\",\"outputs\":[{\"internalType\":\"contractIZekoGenerativeNFT\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"nullifierSpent\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC721Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"root\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_firstNFTID\",\"type\":\"uint256\"}],\"name\":\"setInitialTokenId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"newRoot\",\"type\":\"bytes32\"}],\"name\":\"updateRoot\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x60806040523480156200001157600080fd5b50604051620017b7380380620017b78339818101604052810190620000379190620002f6565b620000576200004b620000f160201b60201c565b620000f960201b60201c565b83600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260028190555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806004819055505050505062000368565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001ef82620001c2565b9050919050565b60006200020382620001e2565b9050919050565b6200021581620001f6565b81146200022157600080fd5b50565b60008151905062000235816200020a565b92915050565b6000819050919050565b62000250816200023b565b81146200025c57600080fd5b50565b600081519050620002708162000245565b92915050565b60006200028382620001e2565b9050919050565b620002958162000276565b8114620002a157600080fd5b50565b600081519050620002b5816200028a565b92915050565b6000819050919050565b620002d081620002bb565b8114620002dc57600080fd5b50565b600081519050620002f081620002c5565b92915050565b60008060008060808587031215620003135762000312620001bd565b5b6000620003238782880162000224565b945050602062000336878288016200025f565b93505060406200034987828801620002a4565b92505060606200035c87828801620002df565b91505092959194509250565b61143f80620003786000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80637f0d7159116100715780637f0d7159146101795780638da5cb5b14610197578063b9f11b51146101b5578063d06fcba8146101e5578063ebf0c71714610203578063f2fde38b14610221576100b4565b8063150b7a02146100b957806321ff9970146100e957806338c86911146101055780637050796e14610135578063715018a6146101535780637dd14b731461015d575b600080fd5b6100d360048036038101906100ce9190610b8d565b61023d565b6040516100e09190610c4b565b60405180910390f35b61010360048036038101906100fe9190610c9c565b610251565b005b61011f600480360381019061011a9190610c9c565b6102d7565b60405161012c9190610ce4565b60405180910390f35b61013d6102f7565b60405161014a9190610d0e565b60405180910390f35b61015b6102fd565b005b61017760048036038101906101729190610d89565b610385565b005b610181610714565b60405161018e9190610d0e565b60405180910390f35b61019f61071a565b6040516101ac9190610e0c565b60405180910390f35b6101cf60048036038101906101ca9190610e27565b610743565b6040516101dc9190610d0e565b60405180910390f35b6101ed6107b0565b6040516101fa9190610eb3565b60405180910390f35b61020b6107d6565b6040516102189190610edd565b60405180910390f35b61023b60048036038101906102369190610ef8565b6107dc565b005b600063150b7a0260e01b9050949350505050565b6102596108d3565b73ffffffffffffffffffffffffffffffffffffffff1661027761071a565b73ffffffffffffffffffffffffffffffffffffffff16146102cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c490610f82565b60405180910390fd5b8060048190555050565b60066020528060005260406000206000915054906101000a900460ff1681565b60055481565b6103056108d3565b73ffffffffffffffffffffffffffffffffffffffff1661032361071a565b73ffffffffffffffffffffffffffffffffffffffff1614610379576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037090610f82565b60405180910390fd5b61038360006108db565b565b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018260001c106103ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103e190611014565b60405180910390fd5b6006600083815260200190815260200160002060009054906101000a900460ff161561044b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044290611080565b60405180910390fd5b6000600467ffffffffffffffff81111561046857610467610a62565b5b6040519080825280602002602001820160405280156104965781602001602082028036833780820191505090505b50905060045460001c816000815181106104b3576104b26110a0565b5b6020026020010181815250508260001c816001815181106104d7576104d66110a0565b5b6020026020010181815250508160001c816002815181106104fb576104fa6110a0565b5b6020026020010181815250503373ffffffffffffffffffffffffffffffffffffffff1681600381518110610532576105316110a0565b5b602002602001018181525050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631e8e1e138686846040518463ffffffff1660e01b815260040161059d939291906111cb565b602060405180830381865afa1580156105ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105de9190611230565b61061d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610614906112a9565b60405180910390fd5b60016006600085815260200190815260200160002060006101000a81548160ff021916908315150217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd30338460028151811061069d5761069c6110a0565b5b60200260200101516040518463ffffffff1660e01b81526004016106c3939291906112c9565b600060405180830381600087803b1580156106dd57600080fd5b505af11580156106f1573d6000803e3d6000fd5b50505050600560008154809291906107089061132f565b91905055505050505050565b60025481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461079f57600080fd5b816005819055506005549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045481565b6107e46108d3565b73ffffffffffffffffffffffffffffffffffffffff1661080261071a565b73ffffffffffffffffffffffffffffffffffffffff1614610858576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161084f90610f82565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036108c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108be906113e9565b60405180910390fd5b6108d0816108db565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109de826109b3565b9050919050565b6109ee816109d3565b81146109f957600080fd5b50565b600081359050610a0b816109e5565b92915050565b6000819050919050565b610a2481610a11565b8114610a2f57600080fd5b50565b600081359050610a4181610a1b565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610a9a82610a51565b810181811067ffffffffffffffff82111715610ab957610ab8610a62565b5b80604052505050565b6000610acc61099f565b9050610ad88282610a91565b919050565b600067ffffffffffffffff821115610af857610af7610a62565b5b610b0182610a51565b9050602081019050919050565b82818337600083830152505050565b6000610b30610b2b84610add565b610ac2565b905082815260208101848484011115610b4c57610b4b610a4c565b5b610b57848285610b0e565b509392505050565b600082601f830112610b7457610b73610a47565b5b8135610b84848260208601610b1d565b91505092915050565b60008060008060808587031215610ba757610ba66109a9565b5b6000610bb5878288016109fc565b9450506020610bc6878288016109fc565b9350506040610bd787828801610a32565b925050606085013567ffffffffffffffff811115610bf857610bf76109ae565b5b610c0487828801610b5f565b91505092959194509250565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b610c4581610c10565b82525050565b6000602082019050610c606000830184610c3c565b92915050565b6000819050919050565b610c7981610c66565b8114610c8457600080fd5b50565b600081359050610c9681610c70565b92915050565b600060208284031215610cb257610cb16109a9565b5b6000610cc084828501610c87565b91505092915050565b60008115159050919050565b610cde81610cc9565b82525050565b6000602082019050610cf96000830184610cd5565b92915050565b610d0881610a11565b82525050565b6000602082019050610d236000830184610cff565b92915050565b600080fd5b600080fd5b60008083601f840112610d4957610d48610a47565b5b8235905067ffffffffffffffff811115610d6657610d65610d29565b5b602083019150836001820283011115610d8257610d81610d2e565b5b9250929050565b60008060008060608587031215610da357610da26109a9565b5b600085013567ffffffffffffffff811115610dc157610dc06109ae565b5b610dcd87828801610d33565b94509450506020610de087828801610c87565b9250506040610df187828801610c87565b91505092959194509250565b610e06816109d3565b82525050565b6000602082019050610e216000830184610dfd565b92915050565b600060208284031215610e3d57610e3c6109a9565b5b6000610e4b84828501610a32565b91505092915050565b6000819050919050565b6000610e79610e74610e6f846109b3565b610e54565b6109b3565b9050919050565b6000610e8b82610e5e565b9050919050565b6000610e9d82610e80565b9050919050565b610ead81610e92565b82525050565b6000602082019050610ec86000830184610ea4565b92915050565b610ed781610c66565b82525050565b6000602082019050610ef26000830184610ece565b92915050565b600060208284031215610f0e57610f0d6109a9565b5b6000610f1c848285016109fc565b91505092915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610f6c602083610f25565b9150610f7782610f36565b602082019050919050565b60006020820190508181036000830152610f9b81610f5f565b9050919050565b7f4e756c6c6966696572206973206e6f742077697468696e20746865206669656c60008201527f6400000000000000000000000000000000000000000000000000000000000000602082015250565b6000610ffe602183610f25565b915061100982610fa2565b604082019050919050565b6000602082019050818103600083015261102d81610ff1565b9050919050565b7f41697264726f7020616c72656164792072656465656d65640000000000000000600082015250565b600061106a601883610f25565b915061107582611034565b602082019050919050565b600060208201905081810360008301526110998161105d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b60006110ec83856110cf565b93506110f9838584610b0e565b61110283610a51565b840190509392505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61114281610a11565b82525050565b60006111548383611139565b60208301905092915050565b6000602082019050919050565b60006111788261110d565b6111828185611118565b935061118d83611129565b8060005b838110156111be5781516111a58882611148565b97506111b083611160565b925050600181019050611191565b5085935050505092915050565b600060408201905081810360008301526111e68185876110e0565b905081810360208301526111fa818461116d565b9050949350505050565b61120d81610cc9565b811461121857600080fd5b50565b60008151905061122a81611204565b92915050565b600060208284031215611246576112456109a9565b5b60006112548482850161121b565b91505092915050565b7f50726f6f6620766572696669636174696f6e206661696c656400000000000000600082015250565b6000611293601983610f25565b915061129e8261125d565b602082019050919050565b600060208201905081810360008301526112c281611286565b9050919050565b60006060820190506112de6000830186610dfd565b6112eb6020830185610dfd565b6112f86040830184610cff565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061133a82610a11565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361136c5761136b611300565b5b600182019050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006113d3602683610f25565b91506113de82611377565b604082019050919050565b60006020820190508181036000830152611402816113c6565b905091905056fea26469706673582212206913505d58a7b53c3b8cd9a686e11158fa5381b87cb170173398549f5918e72364736f6c634300080f0033",
}

// PrivateairdropABI is the input ABI used to generate the binding from.
// Deprecated: Use PrivateairdropMetaData.ABI instead.
var PrivateairdropABI = PrivateairdropMetaData.ABI

// PrivateairdropBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use PrivateairdropMetaData.Bin instead.
var PrivateairdropBin = PrivateairdropMetaData.Bin

// DeployPrivateairdrop deploys a new Ethereum contract, binding an instance of Privateairdrop to it.
func DeployPrivateairdrop(auth *bind.TransactOpts, backend bind.ContractBackend, _nftToken common.Address, _amountPerRedemption *big.Int, _verifier common.Address, _root [32]byte) (common.Address, *types.Transaction, *Privateairdrop, error) {
	parsed, err := PrivateairdropMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(PrivateairdropBin), backend, _nftToken, _amountPerRedemption, _verifier, _root)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Privateairdrop{PrivateairdropCaller: PrivateairdropCaller{contract: contract}, PrivateairdropTransactor: PrivateairdropTransactor{contract: contract}, PrivateairdropFilterer: PrivateairdropFilterer{contract: contract}}, nil
}

// Privateairdrop is an auto generated Go binding around an Ethereum contract.
type Privateairdrop struct {
	PrivateairdropCaller     // Read-only binding to the contract
	PrivateairdropTransactor // Write-only binding to the contract
	PrivateairdropFilterer   // Log filterer for contract events
}

// PrivateairdropCaller is an auto generated read-only Go binding around an Ethereum contract.
type PrivateairdropCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PrivateairdropTransactor is an auto generated write-only Go binding around an Ethereum contract.
type PrivateairdropTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PrivateairdropFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type PrivateairdropFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// PrivateairdropSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type PrivateairdropSession struct {
	Contract     *Privateairdrop   // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// PrivateairdropCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type PrivateairdropCallerSession struct {
	Contract *PrivateairdropCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts         // Call options to use throughout this session
}

// PrivateairdropTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type PrivateairdropTransactorSession struct {
	Contract     *PrivateairdropTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts         // Transaction auth options to use throughout this session
}

// PrivateairdropRaw is an auto generated low-level Go binding around an Ethereum contract.
type PrivateairdropRaw struct {
	Contract *Privateairdrop // Generic contract binding to access the raw methods on
}

// PrivateairdropCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type PrivateairdropCallerRaw struct {
	Contract *PrivateairdropCaller // Generic read-only contract binding to access the raw methods on
}

// PrivateairdropTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type PrivateairdropTransactorRaw struct {
	Contract *PrivateairdropTransactor // Generic write-only contract binding to access the raw methods on
}

// NewPrivateairdrop creates a new instance of Privateairdrop, bound to a specific deployed contract.
func NewPrivateairdrop(address common.Address, backend bind.ContractBackend) (*Privateairdrop, error) {
	contract, err := bindPrivateairdrop(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Privateairdrop{PrivateairdropCaller: PrivateairdropCaller{contract: contract}, PrivateairdropTransactor: PrivateairdropTransactor{contract: contract}, PrivateairdropFilterer: PrivateairdropFilterer{contract: contract}}, nil
}

// NewPrivateairdropCaller creates a new read-only instance of Privateairdrop, bound to a specific deployed contract.
func NewPrivateairdropCaller(address common.Address, caller bind.ContractCaller) (*PrivateairdropCaller, error) {
	contract, err := bindPrivateairdrop(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &PrivateairdropCaller{contract: contract}, nil
}

// NewPrivateairdropTransactor creates a new write-only instance of Privateairdrop, bound to a specific deployed contract.
func NewPrivateairdropTransactor(address common.Address, transactor bind.ContractTransactor) (*PrivateairdropTransactor, error) {
	contract, err := bindPrivateairdrop(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &PrivateairdropTransactor{contract: contract}, nil
}

// NewPrivateairdropFilterer creates a new log filterer instance of Privateairdrop, bound to a specific deployed contract.
func NewPrivateairdropFilterer(address common.Address, filterer bind.ContractFilterer) (*PrivateairdropFilterer, error) {
	contract, err := bindPrivateairdrop(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &PrivateairdropFilterer{contract: contract}, nil
}

// bindPrivateairdrop binds a generic wrapper to an already deployed contract.
func bindPrivateairdrop(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(PrivateairdropABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Privateairdrop *PrivateairdropRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Privateairdrop.Contract.PrivateairdropCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Privateairdrop *PrivateairdropRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Privateairdrop.Contract.PrivateairdropTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Privateairdrop *PrivateairdropRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Privateairdrop.Contract.PrivateairdropTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Privateairdrop *PrivateairdropCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Privateairdrop.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Privateairdrop *PrivateairdropTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Privateairdrop.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Privateairdrop *PrivateairdropTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Privateairdrop.Contract.contract.Transact(opts, method, params...)
}

// AmountPerRedemption is a free data retrieval call binding the contract method 0x7f0d7159.
//
// Solidity: function amountPerRedemption() view returns(uint256)
func (_Privateairdrop *PrivateairdropCaller) AmountPerRedemption(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Privateairdrop.contract.Call(opts, &out, "amountPerRedemption")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// AmountPerRedemption is a free data retrieval call binding the contract method 0x7f0d7159.
//
// Solidity: function amountPerRedemption() view returns(uint256)
func (_Privateairdrop *PrivateairdropSession) AmountPerRedemption() (*big.Int, error) {
	return _Privateairdrop.Contract.AmountPerRedemption(&_Privateairdrop.CallOpts)
}

// AmountPerRedemption is a free data retrieval call binding the contract method 0x7f0d7159.
//
// Solidity: function amountPerRedemption() view returns(uint256)
func (_Privateairdrop *PrivateairdropCallerSession) AmountPerRedemption() (*big.Int, error) {
	return _Privateairdrop.Contract.AmountPerRedemption(&_Privateairdrop.CallOpts)
}

// NextTokenIdToBeAirdropped is a free data retrieval call binding the contract method 0x7050796e.
//
// Solidity: function nextTokenIdToBeAirdropped() view returns(uint256)
func (_Privateairdrop *PrivateairdropCaller) NextTokenIdToBeAirdropped(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Privateairdrop.contract.Call(opts, &out, "nextTokenIdToBeAirdropped")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// NextTokenIdToBeAirdropped is a free data retrieval call binding the contract method 0x7050796e.
//
// Solidity: function nextTokenIdToBeAirdropped() view returns(uint256)
func (_Privateairdrop *PrivateairdropSession) NextTokenIdToBeAirdropped() (*big.Int, error) {
	return _Privateairdrop.Contract.NextTokenIdToBeAirdropped(&_Privateairdrop.CallOpts)
}

// NextTokenIdToBeAirdropped is a free data retrieval call binding the contract method 0x7050796e.
//
// Solidity: function nextTokenIdToBeAirdropped() view returns(uint256)
func (_Privateairdrop *PrivateairdropCallerSession) NextTokenIdToBeAirdropped() (*big.Int, error) {
	return _Privateairdrop.Contract.NextTokenIdToBeAirdropped(&_Privateairdrop.CallOpts)
}

// NftToken is a free data retrieval call binding the contract method 0xd06fcba8.
//
// Solidity: function nftToken() view returns(address)
func (_Privateairdrop *PrivateairdropCaller) NftToken(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Privateairdrop.contract.Call(opts, &out, "nftToken")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// NftToken is a free data retrieval call binding the contract method 0xd06fcba8.
//
// Solidity: function nftToken() view returns(address)
func (_Privateairdrop *PrivateairdropSession) NftToken() (common.Address, error) {
	return _Privateairdrop.Contract.NftToken(&_Privateairdrop.CallOpts)
}

// NftToken is a free data retrieval call binding the contract method 0xd06fcba8.
//
// Solidity: function nftToken() view returns(address)
func (_Privateairdrop *PrivateairdropCallerSession) NftToken() (common.Address, error) {
	return _Privateairdrop.Contract.NftToken(&_Privateairdrop.CallOpts)
}

// NullifierSpent is a free data retrieval call binding the contract method 0x38c86911.
//
// Solidity: function nullifierSpent(bytes32 ) view returns(bool)
func (_Privateairdrop *PrivateairdropCaller) NullifierSpent(opts *bind.CallOpts, arg0 [32]byte) (bool, error) {
	var out []interface{}
	err := _Privateairdrop.contract.Call(opts, &out, "nullifierSpent", arg0)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// NullifierSpent is a free data retrieval call binding the contract method 0x38c86911.
//
// Solidity: function nullifierSpent(bytes32 ) view returns(bool)
func (_Privateairdrop *PrivateairdropSession) NullifierSpent(arg0 [32]byte) (bool, error) {
	return _Privateairdrop.Contract.NullifierSpent(&_Privateairdrop.CallOpts, arg0)
}

// NullifierSpent is a free data retrieval call binding the contract method 0x38c86911.
//
// Solidity: function nullifierSpent(bytes32 ) view returns(bool)
func (_Privateairdrop *PrivateairdropCallerSession) NullifierSpent(arg0 [32]byte) (bool, error) {
	return _Privateairdrop.Contract.NullifierSpent(&_Privateairdrop.CallOpts, arg0)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Privateairdrop *PrivateairdropCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Privateairdrop.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Privateairdrop *PrivateairdropSession) Owner() (common.Address, error) {
	return _Privateairdrop.Contract.Owner(&_Privateairdrop.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Privateairdrop *PrivateairdropCallerSession) Owner() (common.Address, error) {
	return _Privateairdrop.Contract.Owner(&_Privateairdrop.CallOpts)
}

// Root is a free data retrieval call binding the contract method 0xebf0c717.
//
// Solidity: function root() view returns(bytes32)
func (_Privateairdrop *PrivateairdropCaller) Root(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _Privateairdrop.contract.Call(opts, &out, "root")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// Root is a free data retrieval call binding the contract method 0xebf0c717.
//
// Solidity: function root() view returns(bytes32)
func (_Privateairdrop *PrivateairdropSession) Root() ([32]byte, error) {
	return _Privateairdrop.Contract.Root(&_Privateairdrop.CallOpts)
}

// Root is a free data retrieval call binding the contract method 0xebf0c717.
//
// Solidity: function root() view returns(bytes32)
func (_Privateairdrop *PrivateairdropCallerSession) Root() ([32]byte, error) {
	return _Privateairdrop.Contract.Root(&_Privateairdrop.CallOpts)
}

// CollectAirdrop is a paid mutator transaction binding the contract method 0x7dd14b73.
//
// Solidity: function collectAirdrop(bytes proof, bytes32 nullifierHash, bytes32 rewardID) returns()
func (_Privateairdrop *PrivateairdropTransactor) CollectAirdrop(opts *bind.TransactOpts, proof []byte, nullifierHash [32]byte, rewardID [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "collectAirdrop", proof, nullifierHash, rewardID)
}

// CollectAirdrop is a paid mutator transaction binding the contract method 0x7dd14b73.
//
// Solidity: function collectAirdrop(bytes proof, bytes32 nullifierHash, bytes32 rewardID) returns()
func (_Privateairdrop *PrivateairdropSession) CollectAirdrop(proof []byte, nullifierHash [32]byte, rewardID [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.CollectAirdrop(&_Privateairdrop.TransactOpts, proof, nullifierHash, rewardID)
}

// CollectAirdrop is a paid mutator transaction binding the contract method 0x7dd14b73.
//
// Solidity: function collectAirdrop(bytes proof, bytes32 nullifierHash, bytes32 rewardID) returns()
func (_Privateairdrop *PrivateairdropTransactorSession) CollectAirdrop(proof []byte, nullifierHash [32]byte, rewardID [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.CollectAirdrop(&_Privateairdrop.TransactOpts, proof, nullifierHash, rewardID)
}

// OnERC721Received is a paid mutator transaction binding the contract method 0x150b7a02.
//
// Solidity: function onERC721Received(address , address , uint256 , bytes ) returns(bytes4)
func (_Privateairdrop *PrivateairdropTransactor) OnERC721Received(opts *bind.TransactOpts, arg0 common.Address, arg1 common.Address, arg2 *big.Int, arg3 []byte) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "onERC721Received", arg0, arg1, arg2, arg3)
}

// OnERC721Received is a paid mutator transaction binding the contract method 0x150b7a02.
//
// Solidity: function onERC721Received(address , address , uint256 , bytes ) returns(bytes4)
func (_Privateairdrop *PrivateairdropSession) OnERC721Received(arg0 common.Address, arg1 common.Address, arg2 *big.Int, arg3 []byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.OnERC721Received(&_Privateairdrop.TransactOpts, arg0, arg1, arg2, arg3)
}

// OnERC721Received is a paid mutator transaction binding the contract method 0x150b7a02.
//
// Solidity: function onERC721Received(address , address , uint256 , bytes ) returns(bytes4)
func (_Privateairdrop *PrivateairdropTransactorSession) OnERC721Received(arg0 common.Address, arg1 common.Address, arg2 *big.Int, arg3 []byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.OnERC721Received(&_Privateairdrop.TransactOpts, arg0, arg1, arg2, arg3)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Privateairdrop *PrivateairdropTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Privateairdrop *PrivateairdropSession) RenounceOwnership() (*types.Transaction, error) {
	return _Privateairdrop.Contract.RenounceOwnership(&_Privateairdrop.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Privateairdrop *PrivateairdropTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _Privateairdrop.Contract.RenounceOwnership(&_Privateairdrop.TransactOpts)
}

// SetInitialTokenId is a paid mutator transaction binding the contract method 0xb9f11b51.
//
// Solidity: function setInitialTokenId(uint256 _firstNFTID) returns(uint256)
func (_Privateairdrop *PrivateairdropTransactor) SetInitialTokenId(opts *bind.TransactOpts, _firstNFTID *big.Int) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "setInitialTokenId", _firstNFTID)
}

// SetInitialTokenId is a paid mutator transaction binding the contract method 0xb9f11b51.
//
// Solidity: function setInitialTokenId(uint256 _firstNFTID) returns(uint256)
func (_Privateairdrop *PrivateairdropSession) SetInitialTokenId(_firstNFTID *big.Int) (*types.Transaction, error) {
	return _Privateairdrop.Contract.SetInitialTokenId(&_Privateairdrop.TransactOpts, _firstNFTID)
}

// SetInitialTokenId is a paid mutator transaction binding the contract method 0xb9f11b51.
//
// Solidity: function setInitialTokenId(uint256 _firstNFTID) returns(uint256)
func (_Privateairdrop *PrivateairdropTransactorSession) SetInitialTokenId(_firstNFTID *big.Int) (*types.Transaction, error) {
	return _Privateairdrop.Contract.SetInitialTokenId(&_Privateairdrop.TransactOpts, _firstNFTID)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Privateairdrop *PrivateairdropTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Privateairdrop *PrivateairdropSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Privateairdrop.Contract.TransferOwnership(&_Privateairdrop.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Privateairdrop *PrivateairdropTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Privateairdrop.Contract.TransferOwnership(&_Privateairdrop.TransactOpts, newOwner)
}

// UpdateRoot is a paid mutator transaction binding the contract method 0x21ff9970.
//
// Solidity: function updateRoot(bytes32 newRoot) returns()
func (_Privateairdrop *PrivateairdropTransactor) UpdateRoot(opts *bind.TransactOpts, newRoot [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "updateRoot", newRoot)
}

// UpdateRoot is a paid mutator transaction binding the contract method 0x21ff9970.
//
// Solidity: function updateRoot(bytes32 newRoot) returns()
func (_Privateairdrop *PrivateairdropSession) UpdateRoot(newRoot [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.UpdateRoot(&_Privateairdrop.TransactOpts, newRoot)
}

// UpdateRoot is a paid mutator transaction binding the contract method 0x21ff9970.
//
// Solidity: function updateRoot(bytes32 newRoot) returns()
func (_Privateairdrop *PrivateairdropTransactorSession) UpdateRoot(newRoot [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.UpdateRoot(&_Privateairdrop.TransactOpts, newRoot)
}

// PrivateairdropOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Privateairdrop contract.
type PrivateairdropOwnershipTransferredIterator struct {
	Event *PrivateairdropOwnershipTransferred // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *PrivateairdropOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(PrivateairdropOwnershipTransferred)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(PrivateairdropOwnershipTransferred)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *PrivateairdropOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *PrivateairdropOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// PrivateairdropOwnershipTransferred represents a OwnershipTransferred event raised by the Privateairdrop contract.
type PrivateairdropOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Privateairdrop *PrivateairdropFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*PrivateairdropOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Privateairdrop.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &PrivateairdropOwnershipTransferredIterator{contract: _Privateairdrop.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Privateairdrop *PrivateairdropFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *PrivateairdropOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Privateairdrop.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(PrivateairdropOwnershipTransferred)
				if err := _Privateairdrop.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Privateairdrop *PrivateairdropFilterer) ParseOwnershipTransferred(log types.Log) (*PrivateairdropOwnershipTransferred, error) {
	event := new(PrivateairdropOwnershipTransferred)
	if err := _Privateairdrop.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
