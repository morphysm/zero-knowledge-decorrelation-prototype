// SPDX-License-Identifier: AGPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IPlonkVerifier {
    function verifyProof(bytes memory proof, uint256[] memory pubSignals)
        external
        view
        returns (bool);
}

interface IZekoGenerativeNFT {
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

interface IApprovedRewards {
    enum RewardType { ZEKONFT, FAMEDTOKEN }
    struct Reward {
        bool approved;
        RewardType rewardType;
        uint256 value;
    }
    function rewards(
        bytes32 rewardId
    ) external view returns (Reward memory);
}

interface IFamedToken {
    function mint(address _receiver, uint256 _amount) external;
}

/// @title An example airdrop contract utilizing a zk-proof of MerkleTree inclusion.
contract PrivateAirdrop is Ownable, IERC721Receiver {
    uint256 constant SNARK_FIELD =
        21888242871839275222246405745257275088548364400416034343698204186575808495617;

    IZekoGenerativeNFT public nftToken;
    uint256 public amountPerRedemption;

    IPlonkVerifier verifier;
    bytes32 public root;
    uint256 public worldBaseTokenId;

    IApprovedRewards approve;
    IFamedToken token;

    mapping(bytes32 => bool) public nullifierSpent;

    constructor(
        IZekoGenerativeNFT _nftToken,
        uint256 _amountPerRedemption,
        IPlonkVerifier _verifier,
        IApprovedRewards _approve,
        IFamedToken _token,
        bytes32 _root
    ) {
        nftToken = _nftToken;
        amountPerRedemption = _amountPerRedemption;
        verifier = _verifier;
        approve = _approve;
        root = _root;
        token = _token;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /// @notice Allows only the NFT contract to up the Token Id of the first NFT of the collection to be airdropped.
    function setWorldBaseTokenId(uint256 _firstNFTId) external returns (uint256) {
        require(msg.sender == address(nftToken));
        worldBaseTokenId = _firstNFTId;
        return worldBaseTokenId;
    }

    /// @notice Allows the owner to update the root of the merkle tree.
    /// @dev Function can be removed to make the merkle tree immutable. If removed, the ownable extension can also be removed for gas savings.
    function updateRoot(bytes32 _root) public onlyOwner {
        root = _root;
    }

    /// @notice verifies the proof, collects the airdrop if valid, and prevents this proof from working again.
    function collectAirdrop(
        bytes calldata _proof,
        bytes32 _nullifierHash,
        bytes32 _rewardId
    ) external {
        IApprovedRewards.Reward memory reward = approve.rewards(_rewardId);
        require(reward.approved, "Reward has not been approved");
        require(uint256(_nullifierHash) < SNARK_FIELD, "Nullifier is not within the field");
        require(!nullifierSpent[_nullifierHash], "Airdrop already redeemed");
        uint256[] memory pubSignals = new uint256[](4);
        pubSignals[0] = uint256(root);
        pubSignals[1] = uint256(_nullifierHash);
        pubSignals[2] = uint256(_rewardId);
        pubSignals[3] = uint256(uint160(msg.sender));
        require(verifier.verifyProof(_proof, pubSignals), "Proof verification failed");
        nullifierSpent[_nullifierHash] = true;
        if (reward.rewardType == IApprovedRewards.RewardType.ZEKONFT) {
            nftToken.transferFrom(address(this), msg.sender, worldBaseTokenId + pubSignals[2]);
            return;
        }
        if (reward.rewardType == IApprovedRewards.RewardType.FAMEDTOKEN) {
            token.mint(msg.sender, reward.value);
            return;
        }
    }
}
