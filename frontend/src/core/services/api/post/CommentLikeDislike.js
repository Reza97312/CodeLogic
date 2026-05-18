import http from "../../../interceptor/interceptor.js";

export const CommentLikeDislike = async (commentId, isLike) => {
  try {
    const endpoint = `/News/CommentLike/${commentId}`;

    const params = {
      LikeType: isLike,
    };

    const result = await http.post(endpoint, null, { params });

    if (isLike) {
      console.log(`Comment ${commentId} Liked!`, result);
    } else {
      console.log(`Comment ${commentId} Disliked!`, result);
    }

    return result;
  } catch (err) {
    console.error("Error posting Like/Dislike:", err);
    throw err;
  }
};
