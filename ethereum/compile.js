const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); // is similar to regular fs - but is improved by the community with helper functions

const buildPath = path.resolve(__dirname, 'build'); // access buildScript
fs.removeSync(buildPath); // extra function -- delete buildPath & folder so compiler only needs to run once

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol'); // path to contracts
const src = fs.readFileSync(campaignPath, 'utf8'); // contents of contract
const output = solc.compile(src, 1).contracts; // output the factory contract & campaign contract

fs.ensureDirSync(buildPath); // checks to see if directory exists !if then create it

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'), // write contract files
    output[contract] // output ABI content to file
  );
}
