const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Require Web3 constructor.
const web3 = new Web3(ganache.provider()); // Provider we want to connect to.

class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

let accounts;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(accounts)
  });
});
