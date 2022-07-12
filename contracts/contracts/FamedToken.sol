// SPDX-License-Identifier: AGPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FamedToken is ERC20 {
    address privateAirdropContract; 

    constructor(address _privateAirdropContract) ERC20("Famed", "FMD") {
        privateAirdropContract = _privateAirdropContract;
    }

    function mint(address _receiver, uint256 _amount) external {
        // Only airdrop can mint
        require(msg.sender == privateAirdropContract, "CALLER_IS_NOT_AIRDROP");

        _mint(_receiver, _amount);
    }

}