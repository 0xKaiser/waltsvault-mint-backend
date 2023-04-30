const express = require('express');
const config = require('config');
const metadata = config.get('metadata');
var router = express.Router();

router.get('/:id', async (req, res) =>{
    console.log(req.params.id)
    const response = {
        "description": metadata.description, 
        "external_url": metadata.external_url, 
        "image": metadata.image, 
        "name": `${metadata.name} ${req.params.id}`,
      }
      return res.send(response) 
})



module.exports = router;