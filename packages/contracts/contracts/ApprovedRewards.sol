// SPDX-License-Identifier: AGPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ApprovedRewards is Ownable {
    // TODO: investigate gas improvements
    /// @notice maps from rewardID to reward, therby tracks if a reward has been approved and what the reward consits of.
    mapping(bytes32 => Reward) public rewards;

    // TODO think about gas optimisations
    enum RewardType { ZEKONFT, FAMEDTOKEN }
    struct Reward {
        bool approved;
        RewardType rewardType;
        uint256 value;
    }

    function addReward(bytes32 _rewardId, RewardType _rewardType, uint256 _value) external onlyOwner {
        rewards[_rewardId] = Reward(
            true,
            _rewardType,
            _value
        );
    }
}