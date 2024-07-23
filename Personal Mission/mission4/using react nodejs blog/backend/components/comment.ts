module.exports = {
    SaveComment: {
        type: "object",
        properties: {
            post_id:{
                type:"string",
                example:"669a171fa0145cef8df926f1"
            },
            parent_comment_id: {
                type: "string",
                example:"null"
            },

            content:{
                type:"object",
                example: "좋은 댓글 감사합니다"
            }

        },
        required: ["post_id","parent_commen_id","contents"],
    },
  };