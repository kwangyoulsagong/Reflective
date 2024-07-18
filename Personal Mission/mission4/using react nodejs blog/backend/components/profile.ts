module.exports = {
    UserProfile: {
        type: "object",
        properties: {
            profile_id: {
                type: "string",
                example: "123453fe",
            },
            user_id: {
                type: "string",
                example: "123214324fe5",
            },
            image_url: {
                type: "string",
                example: "user1@example.com",
            },
        },
        required: ["id", "username", "email"],
    },
  };