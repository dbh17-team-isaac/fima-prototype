pragma solidity ^0.4.0;

contract AuthorizationTracker {
    event Authorization(
        bytes32 encryptedGranter,
        bytes32 encryptedGrantee,
        bytes32 encryptedSubsnapId
    );

    function authorize(bytes32 encryptedGranter, bytes32 encryptedGrantee, bytes32 encryptedSubsnapId) public {
        Authorization(encryptedGranter, encryptedGrantee, encryptedSubsnapId);
    }
}

// abi
// [{"constant":false,"inputs":[{"name":"encryptedGranter","type":"bytes32"},{"name":"encryptedGrantee","type":"bytes32"},{"name":"encryptedSubsnapId","type":"bytes32"}],"name":"authorize","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"encryptedGranter","type":"bytes32"},{"indexed":false,"name":"encryptedGrantee","type":"bytes32"},{"indexed":false,"name":"encryptedSubsnapId","type":"bytes32"}],"name":"Authorization","type":"event"}]
