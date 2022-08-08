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
	ABI: "[{\"inputs\":[{\"internalType\":\"contractIZekoGenerativeNFT\",\"name\":\"_nftToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amountPerRedemption\",\"type\":\"uint256\"},{\"internalType\":\"contractIPlonkVerifier\",\"name\":\"_verifier\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"_root\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"amountPerRedemption\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"_proof\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"_nullifierHash\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_rewardID\",\"type\":\"bytes32\"}],\"name\":\"collectAirdrop\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nftToken\",\"outputs\":[{\"internalType\":\"contractIZekoGenerativeNFT\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"nullifierSpent\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC721Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"root\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_firstNFTID\",\"type\":\"uint256\"}],\"name\":\"setWorldBaseTokenId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_root\",\"type\":\"bytes32\"}],\"name\":\"updateRoot\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"worldBaseTokenId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
	Bin: "0x60806040523480156200001157600080fd5b50604051620017ba380380620017ba8339818101604052810190620000379190620002f6565b620000576200004b620000f160201b60201c565b620000f960201b60201c565b83600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260028190555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806004819055505050505062000368565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001ef82620001c2565b9050919050565b60006200020382620001e2565b9050919050565b6200021581620001f6565b81146200022157600080fd5b50565b60008151905062000235816200020a565b92915050565b6000819050919050565b62000250816200023b565b81146200025c57600080fd5b50565b600081519050620002708162000245565b92915050565b60006200028382620001e2565b9050919050565b620002958162000276565b8114620002a157600080fd5b50565b600081519050620002b5816200028a565b92915050565b6000819050919050565b620002d081620002bb565b8114620002dc57600080fd5b50565b600081519050620002f081620002c5565b92915050565b60008060008060808587031215620003135762000312620001bd565b5b6000620003238782880162000224565b945050602062000336878288016200025f565b93505060406200034987828801620002a4565b92505060606200035c87828801620002df565b91505092959194509250565b61144280620003786000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80637f0d7159116100715780637f0d71591461018b5780638da5cb5b146101a9578063d06fcba8146101c7578063ea82e4fb146101e5578063ebf0c71714610203578063f2fde38b14610221576100b4565b8063150b7a02146100b957806321ff9970146100e957806338c8691114610105578063562f94ac14610135578063715018a6146101655780637dd14b731461016f575b600080fd5b6100d360048036038101906100ce9190610b82565b61023d565b6040516100e09190610c40565b60405180910390f35b61010360048036038101906100fe9190610c91565b610251565b005b61011f600480360381019061011a9190610c91565b6102d7565b60405161012c9190610cd9565b60405180910390f35b61014f600480360381019061014a9190610cf4565b6102f7565b60405161015c9190610d30565b60405180910390f35b61016d610364565b005b61018960048036038101906101849190610dab565b6103ec565b005b610193610770565b6040516101a09190610d30565b60405180910390f35b6101b1610776565b6040516101be9190610e2e565b60405180910390f35b6101cf61079f565b6040516101dc9190610ea8565b60405180910390f35b6101ed6107c5565b6040516101fa9190610d30565b60405180910390f35b61020b6107cb565b6040516102189190610ed2565b60405180910390f35b61023b60048036038101906102369190610eed565b6107d1565b005b600063150b7a0260e01b9050949350505050565b6102596108c8565b73ffffffffffffffffffffffffffffffffffffffff16610277610776565b73ffffffffffffffffffffffffffffffffffffffff16146102cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c490610f77565b60405180910390fd5b8060048190555050565b60066020528060005260406000206000915054906101000a900460ff1681565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461035357600080fd5b816005819055506005549050919050565b61036c6108c8565b73ffffffffffffffffffffffffffffffffffffffff1661038a610776565b73ffffffffffffffffffffffffffffffffffffffff16146103e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d790610f77565b60405180910390fd5b6103ea60006108d0565b565b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000018260001c10610451576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044890611009565b60405180910390fd5b6006600083815260200190815260200160002060009054906101000a900460ff16156104b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104a990611075565b60405180910390fd5b6000600467ffffffffffffffff8111156104cf576104ce610a57565b5b6040519080825280602002602001820160405280156104fd5781602001602082028036833780820191505090505b50905060045460001c8160008151811061051a57610519611095565b5b6020026020010181815250508260001c8160018151811061053e5761053d611095565b5b6020026020010181815250508160001c8160028151811061056257610561611095565b5b6020026020010181815250503373ffffffffffffffffffffffffffffffffffffffff168160038151811061059957610598611095565b5b602002602001018181525050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631e8e1e138686846040518463ffffffff1660e01b8152600401610604939291906111c0565b602060405180830381865afa158015610621573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106459190611225565b610684576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067b9061129e565b60405180910390fd5b60016006600085815260200190815260200160002060006101000a81548160ff021916908315150217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd30338460028151811061070457610703611095565b5b602002602001015160055461071991906112ed565b6040518463ffffffff1660e01b815260040161073793929190611343565b600060405180830381600087803b15801561075157600080fd5b505af1158015610765573d6000803e3d6000fd5b505050505050505050565b60025481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b60045481565b6107d96108c8565b73ffffffffffffffffffffffffffffffffffffffff166107f7610776565b73ffffffffffffffffffffffffffffffffffffffff161461084d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161084490610f77565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036108bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b3906113ec565b60405180910390fd5b6108c5816108d0565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109d3826109a8565b9050919050565b6109e3816109c8565b81146109ee57600080fd5b50565b600081359050610a00816109da565b92915050565b6000819050919050565b610a1981610a06565b8114610a2457600080fd5b50565b600081359050610a3681610a10565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610a8f82610a46565b810181811067ffffffffffffffff82111715610aae57610aad610a57565b5b80604052505050565b6000610ac1610994565b9050610acd8282610a86565b919050565b600067ffffffffffffffff821115610aed57610aec610a57565b5b610af682610a46565b9050602081019050919050565b82818337600083830152505050565b6000610b25610b2084610ad2565b610ab7565b905082815260208101848484011115610b4157610b40610a41565b5b610b4c848285610b03565b509392505050565b600082601f830112610b6957610b68610a3c565b5b8135610b79848260208601610b12565b91505092915050565b60008060008060808587031215610b9c57610b9b61099e565b5b6000610baa878288016109f1565b9450506020610bbb878288016109f1565b9350506040610bcc87828801610a27565b925050606085013567ffffffffffffffff811115610bed57610bec6109a3565b5b610bf987828801610b54565b91505092959194509250565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b610c3a81610c05565b82525050565b6000602082019050610c556000830184610c31565b92915050565b6000819050919050565b610c6e81610c5b565b8114610c7957600080fd5b50565b600081359050610c8b81610c65565b92915050565b600060208284031215610ca757610ca661099e565b5b6000610cb584828501610c7c565b91505092915050565b60008115159050919050565b610cd381610cbe565b82525050565b6000602082019050610cee6000830184610cca565b92915050565b600060208284031215610d0a57610d0961099e565b5b6000610d1884828501610a27565b91505092915050565b610d2a81610a06565b82525050565b6000602082019050610d456000830184610d21565b92915050565b600080fd5b600080fd5b60008083601f840112610d6b57610d6a610a3c565b5b8235905067ffffffffffffffff811115610d8857610d87610d4b565b5b602083019150836001820283011115610da457610da3610d50565b5b9250929050565b60008060008060608587031215610dc557610dc461099e565b5b600085013567ffffffffffffffff811115610de357610de26109a3565b5b610def87828801610d55565b94509450506020610e0287828801610c7c565b9250506040610e1387828801610c7c565b91505092959194509250565b610e28816109c8565b82525050565b6000602082019050610e436000830184610e1f565b92915050565b6000819050919050565b6000610e6e610e69610e64846109a8565b610e49565b6109a8565b9050919050565b6000610e8082610e53565b9050919050565b6000610e9282610e75565b9050919050565b610ea281610e87565b82525050565b6000602082019050610ebd6000830184610e99565b92915050565b610ecc81610c5b565b82525050565b6000602082019050610ee76000830184610ec3565b92915050565b600060208284031215610f0357610f0261099e565b5b6000610f11848285016109f1565b91505092915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610f61602083610f1a565b9150610f6c82610f2b565b602082019050919050565b60006020820190508181036000830152610f9081610f54565b9050919050565b7f4e756c6c6966696572206973206e6f742077697468696e20746865206669656c60008201527f6400000000000000000000000000000000000000000000000000000000000000602082015250565b6000610ff3602183610f1a565b9150610ffe82610f97565b604082019050919050565b6000602082019050818103600083015261102281610fe6565b9050919050565b7f41697264726f7020616c72656164792072656465656d65640000000000000000600082015250565b600061105f601883610f1a565b915061106a82611029565b602082019050919050565b6000602082019050818103600083015261108e81611052565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b60006110e183856110c4565b93506110ee838584610b03565b6110f783610a46565b840190509392505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61113781610a06565b82525050565b6000611149838361112e565b60208301905092915050565b6000602082019050919050565b600061116d82611102565b611177818561110d565b93506111828361111e565b8060005b838110156111b357815161119a888261113d565b97506111a583611155565b925050600181019050611186565b5085935050505092915050565b600060408201905081810360008301526111db8185876110d5565b905081810360208301526111ef8184611162565b9050949350505050565b61120281610cbe565b811461120d57600080fd5b50565b60008151905061121f816111f9565b92915050565b60006020828403121561123b5761123a61099e565b5b600061124984828501611210565b91505092915050565b7f50726f6f6620766572696669636174696f6e206661696c656400000000000000600082015250565b6000611288601983610f1a565b915061129382611252565b602082019050919050565b600060208201905081810360008301526112b78161127b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006112f882610a06565b915061130383610a06565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611338576113376112be565b5b828201905092915050565b60006060820190506113586000830186610e1f565b6113656020830185610e1f565b6113726040830184610d21565b949350505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006113d6602683610f1a565b91506113e18261137a565b604082019050919050565b60006020820190508181036000830152611405816113c9565b905091905056fea2646970667358221220338d7b2d5210da07f0d027a0d2be7529ec017471751c9e55ed331ea9cea209fa64736f6c634300080f0033",
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

// WorldBaseTokenId is a free data retrieval call binding the contract method 0xea82e4fb.
//
// Solidity: function worldBaseTokenId() view returns(uint256)
func (_Privateairdrop *PrivateairdropCaller) WorldBaseTokenId(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Privateairdrop.contract.Call(opts, &out, "worldBaseTokenId")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// WorldBaseTokenId is a free data retrieval call binding the contract method 0xea82e4fb.
//
// Solidity: function worldBaseTokenId() view returns(uint256)
func (_Privateairdrop *PrivateairdropSession) WorldBaseTokenId() (*big.Int, error) {
	return _Privateairdrop.Contract.WorldBaseTokenId(&_Privateairdrop.CallOpts)
}

// WorldBaseTokenId is a free data retrieval call binding the contract method 0xea82e4fb.
//
// Solidity: function worldBaseTokenId() view returns(uint256)
func (_Privateairdrop *PrivateairdropCallerSession) WorldBaseTokenId() (*big.Int, error) {
	return _Privateairdrop.Contract.WorldBaseTokenId(&_Privateairdrop.CallOpts)
}

// CollectAirdrop is a paid mutator transaction binding the contract method 0x7dd14b73.
//
// Solidity: function collectAirdrop(bytes _proof, bytes32 _nullifierHash, bytes32 _rewardID) returns()
func (_Privateairdrop *PrivateairdropTransactor) CollectAirdrop(opts *bind.TransactOpts, _proof []byte, _nullifierHash [32]byte, _rewardID [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "collectAirdrop", _proof, _nullifierHash, _rewardID)
}

// CollectAirdrop is a paid mutator transaction binding the contract method 0x7dd14b73.
//
// Solidity: function collectAirdrop(bytes _proof, bytes32 _nullifierHash, bytes32 _rewardID) returns()
func (_Privateairdrop *PrivateairdropSession) CollectAirdrop(_proof []byte, _nullifierHash [32]byte, _rewardID [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.CollectAirdrop(&_Privateairdrop.TransactOpts, _proof, _nullifierHash, _rewardID)
}

// CollectAirdrop is a paid mutator transaction binding the contract method 0x7dd14b73.
//
// Solidity: function collectAirdrop(bytes _proof, bytes32 _nullifierHash, bytes32 _rewardID) returns()
func (_Privateairdrop *PrivateairdropTransactorSession) CollectAirdrop(_proof []byte, _nullifierHash [32]byte, _rewardID [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.CollectAirdrop(&_Privateairdrop.TransactOpts, _proof, _nullifierHash, _rewardID)
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

// SetWorldBaseTokenId is a paid mutator transaction binding the contract method 0x562f94ac.
//
// Solidity: function setWorldBaseTokenId(uint256 _firstNFTID) returns(uint256)
func (_Privateairdrop *PrivateairdropTransactor) SetWorldBaseTokenId(opts *bind.TransactOpts, _firstNFTID *big.Int) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "setWorldBaseTokenId", _firstNFTID)
}

// SetWorldBaseTokenId is a paid mutator transaction binding the contract method 0x562f94ac.
//
// Solidity: function setWorldBaseTokenId(uint256 _firstNFTID) returns(uint256)
func (_Privateairdrop *PrivateairdropSession) SetWorldBaseTokenId(_firstNFTID *big.Int) (*types.Transaction, error) {
	return _Privateairdrop.Contract.SetWorldBaseTokenId(&_Privateairdrop.TransactOpts, _firstNFTID)
}

// SetWorldBaseTokenId is a paid mutator transaction binding the contract method 0x562f94ac.
//
// Solidity: function setWorldBaseTokenId(uint256 _firstNFTID) returns(uint256)
func (_Privateairdrop *PrivateairdropTransactorSession) SetWorldBaseTokenId(_firstNFTID *big.Int) (*types.Transaction, error) {
	return _Privateairdrop.Contract.SetWorldBaseTokenId(&_Privateairdrop.TransactOpts, _firstNFTID)
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
// Solidity: function updateRoot(bytes32 _root) returns()
func (_Privateairdrop *PrivateairdropTransactor) UpdateRoot(opts *bind.TransactOpts, _root [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.contract.Transact(opts, "updateRoot", _root)
}

// UpdateRoot is a paid mutator transaction binding the contract method 0x21ff9970.
//
// Solidity: function updateRoot(bytes32 _root) returns()
func (_Privateairdrop *PrivateairdropSession) UpdateRoot(_root [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.UpdateRoot(&_Privateairdrop.TransactOpts, _root)
}

// UpdateRoot is a paid mutator transaction binding the contract method 0x21ff9970.
//
// Solidity: function updateRoot(bytes32 _root) returns()
func (_Privateairdrop *PrivateairdropTransactorSession) UpdateRoot(_root [32]byte) (*types.Transaction, error) {
	return _Privateairdrop.Contract.UpdateRoot(&_Privateairdrop.TransactOpts, _root)
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
