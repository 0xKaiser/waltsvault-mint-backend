const express = require('express');
const config = require('config');
const Contractmetadata = config.get('contract_metadata');
var router = express.Router();

router.get('/', async (req, res) =>{
    const response = {
        "name":Contractmetadata.name,
        "description":Contractmetadata.description,
        "image":Contractmetadata.image, 
        "external_url":Contractmetadata.external_url, 
        "seller_fee_basis_points": Number(Contractmetadata.seller_fee_basis_points),
        "fee_recipient":Contractmetadata.fee_recipient
      }
      return res.send(response) 
})

module.exports = router;