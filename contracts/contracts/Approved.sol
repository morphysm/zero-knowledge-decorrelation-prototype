// SPDX-License-Identifier: AGPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Approved is Ownable {
    // TODO: investigate gas improvements
    /// @notice maps from rewardID to reward
    mapping(string => string) public rewards;

    function addReward(string calldata _rewardId, string calldata _reward) external onlyOwner {
        rewards[_rewardId] = _reward;
    }
}