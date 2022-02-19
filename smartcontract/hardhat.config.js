require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "0.8.1",
  networks: {
    matic: {
      url: `${process.env.ALCHEMY_MUMBAI_URL}`,
      accounts: [`0x${process.env.MUMBAI_PRIVATE_KEY}`],
    } 
  }
};


// 3c925953bc644618e2bf29853916629a539ae5861f431af0cfea5a6babcc0b5c