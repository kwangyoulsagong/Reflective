const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const userSchemas = require("../components/auth");
const postSchemas=require("../components/post");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "Test API with express",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      schemas: {
        ...userSchemas,
        ...postSchemas
      },
    },
  },
  apis: ["./router/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
