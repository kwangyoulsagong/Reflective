"use strict";
module.exports = {
    SavePost: {
        type: "object",
        properties: {
            title: {
                type: "string",
                example: "이것은 제목이야"
            },
            contents: {
                type: "object",
                example: {
                    "paragraph": "이것은 본문입니다.",
                    "image": {
                        "url": "http://example.com/image.jpg",
                        "alt": "이미지 설명"
                    }
                }
            },
            like_count: {
                type: "number",
                example: 0
            }
        },
        required: ["title", "contents"],
    }
};
