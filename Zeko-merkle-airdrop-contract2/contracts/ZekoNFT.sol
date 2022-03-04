//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Bring your Discord Dao roles on chain via Zeko NFT Badges
// Functionality to add: 
// Give admin permission to each dao

contract ZekoNFT is ERC721URIStorage {

    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Zeko", "ZKO") {
        owner=msg.sender;
    }

    function mintItem(string memory tokenURI, address _to) public returns (uint256)
    {
        require(msg.sender == owner);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

}