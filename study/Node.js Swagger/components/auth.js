module.exports = {
    UserSignup: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "sgky0511@naver.com",
        },
        password: {
          type: "string",
          example: "hello1234",
        },
      },
      required: ["username", "password"],
    },
    UserLogin: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "sgky0511@naver.com",
        },
        password: {
          type: "string",
          example: "hello1234",
        },
      },
      required: ["username", "password"],
    },
  };
  