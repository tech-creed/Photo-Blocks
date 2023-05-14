// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract User {
    uint256 public userCount = 0;
    struct Accont {
        string wallet_id;
        string name;
        string role;
        string mail;
    }

    event UserRegister(string wallet_id, string name, string role, string mail);

    mapping(uint256 => Accont) public accs;

    function createUser(string memory _walletID, string memory _name, string memory _role, string memory _mail) public {
        userCount++;
        accs[userCount] = Accont(_walletID, _name, _role, _mail);
        emit UserRegister(_walletID, _name, _role, _mail);
    }

}
