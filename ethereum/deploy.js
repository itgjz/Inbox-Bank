const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const compiledCampaign = require('./build/Campaign.json');


const provider = new HDWalletProvider(
  "century slim broom never tonight during venture indicate stay undo beauty athlete", // account mnemonic on metamask
  "https://rinkeby.infura.io/v3/8b8b7f8a83b64d8c952529b50a1b8c47" // network infura API
);

const web3 = new Web3(provider);

const deploy = async () => { // for async await pattern
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to: ', result.options.address);
};

deploy();
