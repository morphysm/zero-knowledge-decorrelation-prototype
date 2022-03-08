// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IPlonkVerifier {
    function verifyProof(bytes memory proof, uint[] memory pubSignals) external view returns (bool);
}

interface IZekoGenerativeNFT {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

/// @title An example airdrop contract utilizing a zk-proof of MerkleTree inclusion.
contract PrivateAirdrop is Ownable, IERC721Receiver {
    IZekoGenerativeNFT public airdropToken;
    uint public amountPerRedemption;
    IPlonkVerifier verifier;

    bytes32 public root;

    mapping(bytes32 => bool) public nullifierSpent;

    uint256 constant SNARK_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;

    constructor(
        IZekoGenerativeNFT _airdropToken,
        uint _amountPerRedemption,
        IPlonkVerifier _verifier,
        bytes32 _root
    ) {
        airdropToken = _airdropToken;
        amountPerRedemption = _amountPerRedemption;
        verifier = _verifier;
        root = _root;
    }

    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }


    /// @notice verifies the proof, collects the airdrop if valid, and prevents this proof from working again.
    function collectAirdrop(bytes calldata proof, bytes32 nullifierHash) public {
        require(uint256(nullifierHash) < SNARK_FIELD ,"Nullifier is not within the field");
        require(!nullifierSpent[nullifierHash], "Airdrop already redeemed");

        uint[] memory pubSignals = new uint[](3);
        pubSignals[0] = uint256(root);
        pubSignals[1] = uint256(nullifierHash);
        pubSignals[2] = uint256(uint160(msg.sender));
        require(verifier.verifyProof(proof, pubSignals), "Proof verification failed");
        nullifierSpent[nullifierHash] = true;

        // TO BE FIXED, now it transfers only nft ID:1
        airdropToken.transferFrom(address(this), msg.sender, 1);
    }

    /// @notice Allows the owner to update the root of the merkle tree.
    /// @dev Function can be removed to make the merkle tree immutable. If removed, the ownable extension can also be removed for gas savings.
    function updateRoot(bytes32 newRoot) public onlyOwner {
        root = newRoot;
    }
}
