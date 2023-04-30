require("dotenv").config();
const config = require("config");
const getDomain = config.get("domain");
const ethers = require("ethers");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
console.log(config);
module.exports.signTransaction = async (userAddress, allocatedSpots, nonce) => { //here
  const domain = {
    name: getDomain.name,
    version: getDomain.version,
    chainId: getDomain.chainId,
    verifyingContract: getDomain.verifyingContract,
  };

  const types = config.get("types");

   //here
  const value = {
    nonce, allocatedSpots, userAddress
  };

  return await wallet._signTypedData(domain, types, value);
};