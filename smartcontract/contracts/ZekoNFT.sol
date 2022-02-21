//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
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
    // (daoId => roleId => array of addresses) 
    mapping (uint => mapping (uint => address [])) public claimers;
    mapping (uint => mapping (uint => address [])) public whiteList;

    // Add a mapping that gets you from daoId => RoleId => array of NFT tokenIds that shows if 
    // it's transferable or not
    mapping (uint => mapping (uint => uint [])) public tokenRoleToId;

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

    // - Add address to the white list (serverId => roleId => address) (Admin permission) after internal verification
    function addToWhitelist (address verifiedClaimer, uint _daoId, uint _roleId) public {
        whiteList[_daoId][_roleId].push(verifiedClaimer);
        require(msg.sender == admin);
    }

    // - when called addresses inside the whitelist gets their NFT airdropped otherwise it gets burned
    function blukAirdropForRole (uint _daoId, uint _roleId) public {

        address [] memory addressesToTransfer = whiteList[_daoId][_roleId];
    
        uint [] memory nftMintedIds = tokenRoleToId[_daoId][_roleId];

        for (uint i = 0; i < nftMintedIds.length; i++) {
            _transfer(msg.sender, addressesToTransfer[i], nftMintedIds[i]);
            isNftTransferable[nftMintedIds[i]] = false;
        }

        require(msg.sender == admin);
    }


   function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) override internal {

    require(isNftTransferable[tokenId]=true);
    super._transfer(from, to, tokenId); 
}
}

    




