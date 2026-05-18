import http from "../../../interceptor/interceptor.js";

export const PostFavoriteNews = async (id) => {
  try {
    const result = await http.post(`/News/AddFavoriteNews?NewsId=${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
