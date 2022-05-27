//__/\\\\\\\\\\\\\\\_________________________________________________________________________________/\\\\\\\\\______/\\\\\\\\\\\\____
// _\/\\\///////////________________________________________________________________________________/\\\///////\\\___\/\\\////////\\\__
//___\/\\\_____________________________/\\\\\\\\___/\\\_____________________________________________\/\\\_____\/\\\___\/\\\______\//\\\_
//____\/\\\\\\\\\\\______/\\/\\\\\\____/\\\////\\\_\///___/\\/\\\\\\_______/\\\\\\\\______/\\\\\\\\__\/\\\\\\\\\\\/____\/\\\_______\/\\\_
//_____\/\\\///////______\/\\\////\\\__\//\\\\\\\\\__/\\\_\/\\\////\\\____/\\\/////\\\___/\\\/////\\\_\/\\\//////\\\____\/\\\_______\/\\\_
//______\/\\\_____________\/\\\__\//\\\__\///////\\\_\/\\\_\/\\\__\//\\\__/\\\\\\\\\\\___/\\\\\\\\\\\__\/\\\____\//\\\___\/\\\_______\/\\\_
//_______\/\\\_____________\/\\\___\/\\\__/\\_____\\\_\/\\\_\/\\\___\/\\\_\//\\///////___\//\\///////___\/\\\_____\//\\\__\/\\\_______/\\\__
//________\/\\\\\\\\\\\\\\\_\/\\\___\/\\\_\//\\\\\\\\__\/\\\_\/\\\___\/\\\__\//\\\\\\\\\\__\//\\\\\\\\\\_\/\\\______\//\\\_\/\\\\\\\\\\\\/___
//_________\///////////////__\///____\///___\////////___\///__\///____\///____\//////////____\//////////__\///________\///__\////////////_____
//______________________________________________________________________________________________________________________parker@engineerd.io____
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

// NEED TO ADD AN INTERFACE TO CALL THE PRIVATE AIRDROP CONTRACT

interface IAirdropContract {
    function setInitialTokenId(uint256 _firstNFTID) external returns (uint256);
}

contract ZekoGenerativeNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    mapping(uint256 => Word) public TokenIdToWord;
    mapping(uint256 => uint256) public TransferCounterForTokenId;

    uint256 public stringLimit = 45;

    struct Word {
        string daoName;
        string role;
        string tokenIdInCollection;
        string bgHue;
        string textHue;
    }

    constructor() ERC721("ZekoNFT", "ZK") {}

    function mintRoleToAirdrop(
        string memory _daoName,
        string memory _role,
        uint256 _qty,
        address _PrivateAirdropContract
    ) public onlyOwner {
        bytes memory strDaoBytes = bytes(_daoName);
        bytes memory strRoleBytes = bytes(_role);
        require(
            strDaoBytes.length <= stringLimit,
            "String input exceeds limit."
        );
        require(
            strRoleBytes.length <= stringLimit,
            "String input exceeds limit."
        );
        IAirdropContract(_PrivateAirdropContract).setInitialTokenId(
            totalSupply() + 1
        );
        for (uint256 i = 0; i < _qty; i++) {
            uint256 supply = totalSupply();
            Word memory newWord = Word(
                _daoName,
                _role,
                string(
                    abi.encodePacked(
                        "#",
                        uint256(i + 1).toString(),
                        "/",
                        uint256(_qty).toString()
                    )
                ),
                randomNum(361, block.difficulty, supply).toString(),
                randomNum(361, block.timestamp, supply).toString()
            );

            TokenIdToWord[supply + 1] = newWord; //Add word to mapping @tokenId
            TransferCounterForTokenId[supply + 1] == 0; // create TransferCounterForTokenId for NFT, in order to make it non transferable after the first transfer
            _safeMint(_PrivateAirdropContract, supply + 1);
        }
    }

    function randomNum(
        uint256 _mod,
        uint256 _seed,
        uint256 _salt
    ) public view returns (uint256) {
        uint256 num = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, _seed, _salt)
            )
        ) % _mod;
        return num;
    }

    function buildImage(uint256 _tokenId) private view returns (string memory) {
        Word memory currentWord = TokenIdToWord[_tokenId];
        string memory random = randomNum(361, 3, 3).toString();
        return
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">',
                        '<rect height="500" width="500" y="0" x="0" fill="hsl(',
                        currentWord.bgHue,
                        ',50%,25%)"/>',
                        '<text font-size="18" y="10%" x="50%" text-anchor="middle" fill="hsl(',
                        random,
                        ',100%,80%)">',
                        currentWord.tokenIdInCollection,
                        "</text>",
                        '<text font-size="18" y="50%" x="50%" text-anchor="middle" fill="hsl(',
                        random,
                        ',100%,80%)"> daoName:',
                        currentWord.daoName,
                        "</text>",
                        '<text font-size="18" y="80%" x="50%" text-anchor="middle" fill="hsl(',
                        random,
                        ',100%,80%)"> daoRole:',
                        currentWord.role,
                        "</text>",
                        "</svg>"
                    )
                )
            );
    }

    function buildMetadata(uint256 _tokenId)
        private
        view
        returns (string memory)
    {
        Word memory currentWord = TokenIdToWord[_tokenId];
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"Dao":"',
                                currentWord.daoName,
                                '", "Role":"',
                                currentWord.role,
                                '", "TokenIdInRoleCollection":"',
                                currentWord.tokenIdInCollection,
                                '", "image": "',
                                "data:image/svg+xml;base64,",
                                buildImage(_tokenId),
                                '", "attributes": ',
                                "[",
                                '{"trait_type": "TextColor",',
                                '"value":"',
                                currentWord.textHue,
                                '"}',
                                "]",
                                "}"
                            )
                        )
                    )
                )
            );
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return buildMetadata(_tokenId);
    }

    // This ovverriding makes the token non transferable after the first transfer
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        require(
            TransferCounterForTokenId[tokenId] == 0,
            "The token is no longer transferable"
        );
        super._transfer(from, to, tokenId);
        TransferCounterForTokenId[tokenId] += 1;
    }
}
