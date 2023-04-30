const config = require("config");
const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger_output.json";

const endpointsFiles = [
  "./app.js",
  "./routes/index.js"
];

const doc = {
  info: {
    title: config.get("swagger.title"),
    description: config.get("swagger.description"),
  },
  host: config.get('swagger.host'),
  schemes: ["https"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);