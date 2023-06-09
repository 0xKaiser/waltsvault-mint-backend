const express = require("express");
const config = require('config');
const router = express.Router();
const apiConfig = config.get('apiControl')
const whitelist = require("../models/whitelist");
const { signTransaction } = require("../utils/signer");

router.post('/', async (req,res) =>{
    try{
        if(apiConfig.unique){
            return res.status(500).send('API not activated');
        }
        const { address, allocatedSpots } = req.body; //here

        console.log(address);
        const walletAddress = await whitelist.findOne({address:{'$regex': address, '$options': 'i'}, allocatedSpots}); //here
        console.log(walletAddress,'data');
        if(!walletAddress){
            res.status(500).send('Not Found');
        }
        else{
            const ts = parseInt(Date.now()/1000)
            console.log(ts);
            const sign = await signTransaction(walletAddress.address, walletAddress.allocatedSpots, ts);
            res.send({
                address: walletAddress.address,
                allocatedSpots: walletAddress.allocatedSpots,
                signature : [ts, walletAddress.allocatedSpots, walletAddress.address, sign]
            })
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

router.post('/unique', async (req,res) =>{
    try{

        if(!apiConfig.unique)
        {
            return res.status(500).send('API not activated');
        }
        const { address} = req.body; //here

        console.log(address);
        const walletAddress = await whitelist.findOne({address: {'$regex': address, '$options': 'i'}}); //here
        console.log(walletAddress,'data');
        if(!walletAddress){
            res.status(500).send('Not Found');
        }
        else{
            const ts = parseInt(Date.now()/1000)
            console.log(ts);
            const sign = await signTransaction(walletAddress.address, walletAddress.allocatedSpots, ts);
            res.send({
                address: walletAddress.address,
                allocatedSpots: walletAddress.allocatedSpots,
                signature : [ts, walletAddress.allocatedSpots, walletAddress.address, sign]
            })
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router;