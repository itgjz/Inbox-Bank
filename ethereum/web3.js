import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') { // if it does not return undefined we are in the browser else we are in the node env
  // we are in the browser & metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/8b8b7f8a83b64d8c952529b50a1b8c47'
  );
  web3 = new Web3(provider);
}

export default web3;
