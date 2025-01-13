module.exports = {
    UserProfileImage: {
        type: "object",
        properties: {
            image_url: {
                type: "string",
                example:"http://example.com/new-image.jpg"
            },
        },
        required: ["image_url"],
    },
    UserProfile: {
        type: "object",
        properties: {
          nickname: {
              type: "string",
              example: "amazeball"
          },
          phone_number:{
              type: "string",
              example: "010-1234-5678"
          }
        },
        required: ["nickname", "phone_number"],
      },
  };