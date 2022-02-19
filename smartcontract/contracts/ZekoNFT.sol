//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// create IPFS function to issue the NFT 
// ZK Badge, It doesn't display who you are on the frontend!
// - ERC721 full interface (base, metadata, enumerable)

// Function required:
// - BulkTransfer to whitelisted address (set a timeout!) (can only be called by the admin = me)
// - Make the badge non transferable after BulkTransfer
// - separaPerProgetto...

// to add:
// - Burnable NFTs

contract ZekoNFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // The contract deployer becomes the admin of the contract 
    address public admin;

    // Add a mapping of "claimers" 
    // Add a mapping of "whitelisted addresses"  
    // (daoId => serverId => array of addresses, to fix) 
    mapping (uint => mapping (uint => address [])) claimers;
    mapping (uint => mapping (uint => address [])) whiteList;

    // Add a mapping that gets you from NFT RoleId to array of tokenId
    mapping (uint => uint []) tokenRoleToId;

    constructor() ERC721("Zeko", "ZKO") {
        admin = msg.sender;
    }

    // it should only be called by the admin (Zeko or Dao)
    // mint NFT without actually assigning it to anyone
    function mintARole (string memory tokenURI, uint roleId) public {
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenRoleToId[roleId].push(newItemId);
        require(msg.sender == admin);
    }


    // - Claim the NFT (add your address to a list) (address => Dao Id => roleId)
    function claimNft(uint daoId, uint roleId) public {
        claimers[daoId][roleId].push(msg.sender);
    }


    // - Add address to the white addresses (address => serverId => roleId) (Admin permission) after internal verification
    function addToWhitelist (address verifiedClaimer, uint daoId, uint roleId) public {
        whiteList[daoId][roleId].push(verifiedClaimer);
        require(msg.sender == admin);
    }


    // - After the claiming time has experied airdrop, addresses inside the whitelist gets their NFT otherwise it gets burned
    function blukAirdropForRole (uint serverId, uint roleId) public {

        address [] memory addressesToTransfer = whiteList[serverId][roleId];
    
        uint [] memory nftMintedIds = tokenRoleToId[roleId];

        for (uint i = 0; i < nftMintedIds.length; i++) {

            _transfer(msg.sender, addressesToTransfer[i], nftMintedIds[i]);
        }
        require(msg.sender == admin);
    }

}

    




