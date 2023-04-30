const router = require("express").Router();
const signerRoute = require("./signerRoute");
const metadataRoute=require("./metadata");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");
const contractMetadata = require("../routes/contractMetadata");

router.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
router.use("/signer", signerRoute);
router.use("/metadata",metadataRoute);
router.use("/contract-metadata",contractMetadata);
router.get("/", async (req, res) =>{
    res.send("Server Up");
})

module.exports = router;

