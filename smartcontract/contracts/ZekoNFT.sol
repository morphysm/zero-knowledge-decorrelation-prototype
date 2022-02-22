//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Bring your Discord Dao roles on chain via Zeko NFT Badges

// Functionality to add: 
// Give admin permission to each dao

contract ZekoNFT is ERC721URIStorage {

    event RoleTokenAssigned (uint256 daoId, uint256 roleId, uint256 tokenId);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // The contract deployer becomes the admin of the contract 
    address public admin;

    // Add a mapping of "claimers" 
    // (daoId => roleId => array of addresses) 
    mapping (uint => mapping (uint => address [])) public claimers;

    // Add a mapping that gets you from daoId => RoleId => array of NFT's tokenIds
    mapping (uint => mapping (uint => uint [])) private _daoToRoleToId;

    // Add a mapping that gets you from NFT id to its trasnferability
    mapping (uint => bool) isNftTransferable;

    constructor() ERC721("Zeko", "ZKO") {
        admin = msg.sender;
    }

    // it should only be called by the admin (Zeko or Dao)
    // mint NFT without actually assigning it to anyone
    function mintARole (string memory tokenURI, uint _roleId, uint _daoId) public{
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenRoleToId[_daoId][_roleId].push(newItemId);
        require(msg.sender == admin);
    }

    // - Claim the NFT (add your address to a list) (address => Dao Id => roleId)
    function claimNft(uint _daoId, uint _roleId) public {
        claimers[_daoId][_roleId].push(msg.sender);
    }

    
    function mintNFT(uint _daoId, uint _roleId) public {
        claimers[_daoId][_roleId].push(msg.sender);
    }

    // admin requriments 
    function blukAirdropForRole (uint _daoId, uint _roleId, address [] addressesToTransfer) public {
    
        uint [] memory nftMintedIds = tokenRoleToId[_daoId][_roleId];

        for (uint i = 0; i < nftMintedIds.length; i++) {
            _transfer(msg.sender, addressesToTransfer[i], nftMintedIds[i]);
            isNftTransferable[nftMintedIds[i]] = false;

            emit RoleTokenAssigned(_daoId, _roleId, nftMintedIds[i]);
        }

        require(msg.sender == admin);
    }

    // Make the badge non transferable after Airdrop
    function _transfer(address from, address to, uint256 tokenId) override internal {
        require(isNftTransferable[tokenId]=true);
        super._transfer(from, to, tokenId); 
    }

    function daoToRoleToId (uint256 _daoId, uint256 _roleId) public view returns (uint256) {

        return _daoToRoleToId[_daoId][_roleId ];
    }

    // you can only burn NFTs owned by the msg.sender
    function burn(uint256 tokenId) public {

        require(msg.sender == admin);
        require(ownerOf(tokenId) == msg.sender); 
        require(_isApprovedOrOwner(msg.sender, tokenId) || isAdmin(msg.sender));
        _burn(tokenId);
    } 
}

    




