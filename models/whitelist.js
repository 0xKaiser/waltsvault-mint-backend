const mongoose = require("mongoose");
const config = require("config");
const getSchema = config.get('schema');
//schema details
const whitelistSchema = new mongoose.Schema(
    getSchema.schemaDetails
);

module.exports = mongoose.model(getSchema.schemaName, whitelistSchema); //schema name