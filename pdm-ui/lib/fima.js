const fs = require("fs");

/**
 * FIMA PDM library.
 */
var FIMA = module.exports = function(accountAddress, web3Instance) {
    this.accountAddress = accountAddress;
    this.web3 = web3Instance;
    this.web3.eth.defaultAccount = this.accountAddress;
};

FIMA.prototype.bootstrapContracts = function() {
    return {
        authorizationTracker: this.deployContract(
            'contracts/AuthorizationTracker.bytecode',
            'contracts/AuthorizationTracker.abi'
        ),
        identityProvider: this.deployContract(
            'contracts/IdentityProvider.bytecode',
            'contracts/IdentityProvider.abi'
        )
    };
};

FIMA.prototype.getAuthorizationTrackerContract = function(addr) {
    return this.getContract(addr, 'contracts/AuthorizationTracker.abi');
};

FIMA.prototype.getContract = function(addr, ABIPath) {
    console.log('Obtaining contract for addr: ' + addr + '; ABI: ' + ABIPath);

    let abi = fs.readFileSync(ABIPath, 'utf8');
    let abiArray = JSON.parse(abi);
    let contract = this.web3.eth.contract(abiArray);
    return contract.at(addr);
};

FIMA.prototype.deployContract = function(bytecodePath, ABIPath) {
    let bytecode = fs.readFileSync(bytecodePath, 'utf8');
    let abi = fs.readFileSync(ABIPath, 'utf8');

    let gasEstimate = this.web3.eth.estimateGas({data: bytecode});
    let Contract = this.web3.eth.contract(JSON.parse(abi));

    var contractInstance = Contract.new({data: bytecode, gas: gasEstimate, from: this.accountAddress});
    console.log('Deployed new contract with hash: ' + contractInstance.transactionHash);
    return contractInstance;
};

FIMA.prototype.numberToBytes32 = function(number) {
    let numberAsHex = Number(number).toString(16);
    let numberOfZeros = 64 - numberAsHex.length;

    return "0x" + "0".repeat(numberOfZeros) + numberAsHex;
};

FIMA.prototype.bytes32ToNumber = function(bytes) {
    var hex = String(bytes).slice(-8);
    return parseInt(hex, 16);
};
