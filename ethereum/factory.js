import web3 from './web3'; //instance from web3.js
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xB7709f0bC7a9Ef27d37DC289b5d7b2249b8089F5'
);

export default instance;
