# iamSloth Mint Backend

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URI` : place the database url to connect

`PRIVATE_KEY` : add the private key

## Configuration string formats

The variables that we want to create dynamic 
comes under the config file (`default.json`).


we import config module by `require('config')` 
and we use the variables using `config.get("variable_name.attribute")` .


1) The `apiControl` string format have been used to toggel
between the two routes that we initiated in `signerRoute.js` 
using boolean (true/false) value. If  `"unique"` is true then `/`
route in `signerRoute.js` terminates , else `/unique` route is 
invoked. We have created the `"unique"` API to find the address which
is unique to any one of the list.  

    `"apiControl"` : {

        "unique": true

    },

2) `swagger` referencing to the `swagger.js` variables. Swagger is used to visualize and interact with the API's resources without having any of the implementation logic in place.

    `"swagger"` : {

        "title": "",
        "description": "minting backend",
        "host": ""
    },

3) As we get the `"domain"` information from the contract so it would be varying from one contract to another therefore, keeping it dynamic is more efficient.

    `"domain"` : {

        "name": "tas",

        "version": "1",

        "chainId": 4,

        "verifyingContract": "0x780d7a86891d5D5cd2E7866D34F02f3096720EBC"

      },

4) Similarly, model attributes may also change in future with respect to the project requirement.So, this is why we are declaring it in config file.

    `"types"`: {

        "whitelist": [
        { "name": "userAddress", "type": "address" },
        { "name": "listType", "type": "bool" }
        ]
    },

5) In `metadata.js` , the logic is to fetch the id and send the corresponding metadata information in the form of response. Therefore to make it dynamic we are using `"metadata"` string format.

   `"metadata"` : {

        "description": "",
        
        "external_url": "",

        "image": "https://i.ibb.co/PZBL4fB/image-7.png",

        "name": "tas"
  },

6) This is the schema of our database and we have put these in our config file so that if we have to make some changes in the schema then we dont have to change all the variables manually in the code.

    `"schema"` : {

        "schemaName": "whitelistSchema",
        
        "schemaDetails": {

            "address": 
            {

            "type": "String"
            
            },
            "listType": 
            {

                "type": "Boolean"
            }
        }
    },

7) The `userAddress` and `listType` are used in the `signerRoute.js` for the signing logic and as both of these variables may vary accordingly so we are keeping it dynamic  

      `"signer"` : {

          "userAddress": "",
          "listType": ""
      }


