const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const userSchemas = require('../components/auth')
const profileSchemas=require('../components/profile')
const postSchemas=require('../components/post')
const commentSchemas=require('../components/comment')
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "blog Test API",
        version: "1.0.0",
        description: "blog test API with express",
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
          ...profileSchemas,
          ...postSchemas,
          ...commentSchemas
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