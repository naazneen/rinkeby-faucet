// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EthereumFaucet {
    function getFaucetBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function donate() public payable {}

    function getEther(address payable _receiver, uint256 amount) public {
        require(address(this).balance >= amount);

        bool sent = _receiver.send(amount);
        require(sent);
    }
}
