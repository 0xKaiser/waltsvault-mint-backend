require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const ethers = require("ethers");
let List = fs.readFileSync("./List.txt", "utf8").split("\n");
const whiteList = require("../models/whitelist");

let whitelistSigner = async (list) =>{
    let walletAddress;
    const provider = new ethers.
    getDefaultProvider("wss://mainnet.infura.io/ws/v3/fe8e5ac01a944ba2a9fd24160581045a");

    let keysToSign = List;
    for(let i in keysToSign){
        try {
            walletAddress = keysToSign[i].replace(/(\r\n|\n|\r|\t|" ")/gm, "");
            if (walletAddress.endsWith(".eth") || walletAddress.endsWith(".ETH")){
                console.log("Resolving ENS" + walletAddress);
                walletAddress = await provider.resolveName(walletAddress);
            }
            else {
                walletAddress = ethers.utils.getAddress(walletAddress);
            }

            let newWhitelist = new whiteList({
                address: walletAddress,
                listType: list
            });
            await newWhitelist.save();
        }
        catch (e) {
            console.log(walletAddress);
            console.log(e);
        }
    }
    console.log("Done");
}

mongoose
    .connect("")//db url
    .then(() => {
        console.log("Database Connected");
        whitelistSigner(1);
    })
    .catch((e) => console.log("Database Connected Failed",e));