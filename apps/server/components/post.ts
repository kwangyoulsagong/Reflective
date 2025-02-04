module.exports = {
  SavePost: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "이것은 제목이야",
      },

      contents: {
        type: "object",
        example: {
          paragraph: "이것은 본문입니다.",
          image: {
            url: "http://example.com/image.jpg",
            alt: "이미지 설명",
          },
        },
      },
      category: {
        type: "string",
        example: "코딩",
      },
      thumbnail: {
        type: "string",
        example: "http://example.com/image.jpg",
      },
      like_count: {
        type: "number",
        example: 0,
      },
    },
    required: ["title", "contents", "category", "thumbnail", "like_count"],
  },
  RecentPost: {
    type: "object",
    properties: {
      post_id: {
        type: "string",
        example: "1",
      },
      user_id: {
        type: "string",
        example: "1",
      },
      nickname: {
        type: "string",
        example: "amazeball",
      },
      title: {
        type: "string",
        example: "이것은 제목이야",
      },

      contents: {
        type: "object",
        example: {
          paragraph: "이것은 본문입니다.",
          image: {
            url: "http://example.com/image.jpg",
            alt: "이미지 설명",
          },
        },
      },
      category: {
        type: "string",
        example: "코딩",
      },
      thumbnail: {
        type: "string",
        example: "http://example.com/image.jpg",
      },
      like_count: {
        type: "number",
        example: 0,
      },
    },
    required: [
      "post_id",
      "user_id",
      "nickname",
      "title",
      "contents",
      "category",
      "thumbnail",
      "like_count",
    ],
  },
  Post: {
    type: "object",
    properties: {
      post_id: {
        type: "string",
        example: "1",
      },
      user_id: {
        type: "string",
        example: "1",
      },
      nickname: {
        type: "string",
        example: "amazeball",
      },
      title: {
        type: "string",
        example: "이것은 제목이야",
      },

      contents: {
        type: "object",
        example: {
          paragraph: "이것은 본문입니다.",
          image: {
            url: "http://example.com/image.jpg",
            alt: "이미지 설명",
          },
        },
      },
      category: {
        type: "string",
        example: "코딩",
      },
      thumbnail: {
        type: "string",
        example: "http://example.com/image.jpg",
      },
      like_count: {
        type: "number",
        example: 0,
      },
    },
    required: [
      "post_id",
      "user_id",
      "nickname",
      "title",
      "contents",
      "category",
      "thumbnail",
      "like_count",
    ],
  },
};
