import http from "../../../interceptor/interceptor.js";

export const NewsLike = async (id) => {
  try {
    const result = await http.post(`/News/NewsLike/${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
