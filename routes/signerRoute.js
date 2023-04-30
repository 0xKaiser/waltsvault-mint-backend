const express = require("express");
const router = express.Router();
const whitelist = require("../models/whitelist");
const { signTransaction } = require("../utils/signer");
const random = require('random');

router.post('/', async (req,res) =>{
    try{
        // if(apiConfig.unique){
        //     return res.status(500).send('API not activated');
        // }
        const { address, listType } = req.body; //here

        console.log(address);
        const walletAddress = await whitelist.findOne({address:{'$regex': address, '$options': 'i'}, listType}); //here
        console.log(walletAddress,'data');
        if(!walletAddress){
            res.status(500).send('Not Found');
        }
        else{
            const ts = parseInt(Date.now()/1000)
            console.log(ts);


            const spot = walletAddress.spots || 1;
            const sign = await signTransaction(walletAddress.address, walletAddress.listType, ts, spot);
            res.send({
                address: walletAddress.address,
                listType: walletAddress.listType,
                availableSpots: spot,
                signature : [ts,spot, walletAddress.listType, walletAddress.address, sign]
            })
        }
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

// router.post('/unique', async (req,res) =>{
//     try{

//         if(!apiConfig.unique)
//         {
//             return res.status(500).send('API not activated');
//         }
//         const { address} = req.body; //here

//         console.log(address);
//         const walletAddress = await whitelist.findOne({address: {'$regex': address, '$options': 'i'}}); //here
//         console.log(walletAddress,'data');
//         if(!walletAddress){
//             res.status(500).send('Not Found');
//         }
//         else{
//             const ts = parseInt(Date.now()/1000)
//             console.log(ts);
//             const sign = await signTransaction(walletAddress.address, walletAddress.listType, ts);
//             res.send({
//                 address: walletAddress.address,
//                 listType: walletAddress.listType,
//                 signature : [ts, walletAddress.listType, walletAddress.address, sign]
//             })
//         }
//     }
//     catch (e) {
//         res.status(500).send(e.message);
//     }
// })

module.exports = router;