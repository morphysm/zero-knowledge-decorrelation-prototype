require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    matic: {
      url: `${process.env.ALCHEMY_MUMBAI_URL}`,
      accounts: [`0x${process.env.MUMBAI_PRIVATE_KEY}`],
    } 
  }
};
