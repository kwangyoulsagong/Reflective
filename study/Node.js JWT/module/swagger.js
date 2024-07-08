const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const userSchemas = require("../components/auth")
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "JWT Test API",
        version: "1.0.0",
        description: "JWT test API with express",
      },
      servers: [
        {
          url: "http://localhost:8000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
          ...userSchemas,
        },
      },
    },
    apis: ["./router/*.js"],
  };

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};
