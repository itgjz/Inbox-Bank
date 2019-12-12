const assert = require('assert');
const ganache = require('ganache-cli');
const W3 = require('web3'); // web3 constructor (W3)
const web3 = new W3(ganache.provider()); // instance of W3 --> ganache-cli provides us with 10 accounts we can use for testing

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory; // ref for deployed instance of CampaignFactory
let campaignAddress;
let campaign;
let minimumCost = '100';
let oneMil = '1000000';

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // interface(ABI) property of compiledFactory
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign(minimumCost).send({
    from: accounts[0], //manager of campaign
    gas: '1000000' // gas cost
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory == campaign (campaignFactory)', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('Caller of instance is the Manager! == accounts[0] (is manager = msg.sender)', async () => {
    const manager = await campaign.methods.manager().call();
      assert.equal(accounts[0], manager);
  });

  it('people can contribute money and become approvers of the campaign setup (contribute)', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor); // true if OK else the test will fail
  });

  it('requires minimumCost of 100WEI to become an approver (approvers true/false)', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts [1]
      });
      assert(false);
    } catch (e) {
      assert(e);
    }
  });

  it('manager can make a payment request (createRequest)', async () => {
    await campaign.methods
      .createRequest('Description for Campaign', '100', accounts[1])
      .send({
        from: accounts[0],
        gas: oneMil
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal('Description for Campaign', request.description);
  });

  it('processes requests (approveRequest --> finalizeRequest)', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest('Description for Campaign', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: oneMil
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: oneMil
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: oneMil
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log(balance); // how much money belongs to reciever
    assert(balance > 104)
  });
});
