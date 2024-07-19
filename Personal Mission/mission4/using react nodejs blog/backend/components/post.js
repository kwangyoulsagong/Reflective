"use strict";
module.exports = {
    SavePost: {
        type: "object",
        properties: {
            title: {
                type: "string",
                example: "이것은 제목이야"
            },
            contents: [
                {
                    "type": "section",
                    "id": "intro",
                    "title": "소개",
                    "html": "<p style='color: #333; font-size: 18px;'>여기는 블로그의 소개 부분입니다.</p>"
                },
                {
                    "type": "section",
                    "id": "main",
                    "title": "주요 내용",
                    "html": "<p style='color: #555; font-size: 16px;'>여기는 블로그의 주요 내용 부분입니다.</p><img src='image.jpg' alt='이미지 설명' style='max-width: 100%; height: auto;' />"
                },
                {
                    "type": "section",
                    "id": "conclusion",
                    "title": "결론",
                    "html": "<p style='color: #666; font-size: 16px;'>여기는 블로그의 결론 부분입니다.</p>"
                }
            ],
            like_count: {
                type: "number",
                example: 0
            }
        },
        required: ["title", "contents", "like_count"],
    }
};
