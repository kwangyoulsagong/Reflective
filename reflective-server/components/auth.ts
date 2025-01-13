module.exports = {
    UserSignup: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "amazeball@example.com",
        },
        password: {
          type: "string",
          example: "hello1234",
        },
        nickname: {
            type: "string",
            example: "amazeball"
        },
        phone_number:{
            type: "string",
            example: "010-1234-5678"
        }
      },
      required: ["email", "password", "nickname", "phone_number"],
    },
    UserLogin: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "amazeball@example.com",
        },
        password: {
          type: "string",
          example: "hello1234",
        },
      },
      required: ["email", "password"],
    },
  };