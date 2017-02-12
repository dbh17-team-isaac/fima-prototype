const fs = require("fs");

/**
 * FIMA PDM library.
 */
var FIMA = module.exports = function(accountAddress, web3Instance) {
    this.accountAddress = accountAddress;
    this.web3 = web3Instance;
};

FIMA.prototype.bootstrapContracts = function() {
    var AuthorizationTrackerContract = this.deployContract(
        'contracts/AuthorizationTracker.bytecode',
        'contracts/AuthorizationTracker.abi'
    );
    var IdentityProviderContract = this.deployContract(
        'contracts/IdentityProvider.bytecode',
        'contracts/IdentityProvider.abi'
    );
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
