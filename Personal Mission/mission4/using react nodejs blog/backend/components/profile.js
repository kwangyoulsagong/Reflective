"use strict";
module.exports = {
    UserProfile: {
        type: "object",
        properties: {
            id: {
                type: "integer",
                example: 1,
            },
            username: {
                type: "string",
                example: "user1",
            },
            email: {
                type: "string",
                example: "user1@example.com",
            },
        },
        required: ["id", "username", "email"],
    },
};
