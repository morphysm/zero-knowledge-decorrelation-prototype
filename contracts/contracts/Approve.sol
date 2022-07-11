// SPDX-License-Identifier: AGPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Approve is Ownable {
    // TODO: investigate gas improvements
    /// @notice maps from rewardID to reward, therby tracks if a reward has been approved and what the reward consits of.
    mapping(bytes32 => bytes32) public rewards;

    function addReward(bytes32 _rewardId, bytes32 _reward) external onlyOwner {
        rewards[_rewardId] = _reward;
    }
}