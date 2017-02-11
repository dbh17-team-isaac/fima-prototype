pragma solidity ^0.4.0;

contract owned {
    address owner;

    modifier onlyowner() {
        if (msg.sender == owner) {
            _;
        }
    }

    function owned() {
        owner = msg.sender;
    }
}

contract IdentityProvider is owned {
    mapping(address => bool) public identities;

    function addIdentity(address identity) onlyowner public  {
        identities[identity] = true;
    }

    function removeIdentity(address identity) onlyowner public  {
        identities[identity] = false;
    }

    function getIdentityStatus(address identity) public
        returns (bool identityStatus)  {
        return identities[identity];
    }
}

// abi
// [{"constant":false,"inputs":[{"name":"identity","type":"address"}],"name":"getIdentityStatus","outputs":[{"name":"identityStatus","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"}],"name":"addIdentity","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"identity","type":"address"}],"name":"removeIdentity","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"identities","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"}]
