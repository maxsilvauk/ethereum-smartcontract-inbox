const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Require Web3 constructor.
const web3 = new Web3(ganache.provider()); // Provider we want to connect to.
const { interface, bytecode } = require('../compile');

class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts.
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract.
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(inbox);
  });
});
