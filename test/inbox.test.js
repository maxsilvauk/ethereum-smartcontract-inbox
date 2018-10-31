const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Require Web3 constructor.
const web3 = new Web3(ganache.provider()); // Provider we want to connect to.
const { interface, bytecode } = require('../compile');

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
  it('Deploys a contract', () => {
    // After we deploy the contract on the test network.
    // An address will be created. Make an assertion that
    // is this a defined value.
    assert.ok(inbox.options.address);
  });

  it ('Has a default message', async () => {
    const message = await inbox.methods.message().call()
  });

  it ('Can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye')
  });
});
