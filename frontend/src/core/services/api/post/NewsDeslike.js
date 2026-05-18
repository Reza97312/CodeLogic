import http from "../../../interceptor/interceptor.js";

export const Newsdeslike = async (id) => {
  try {
    const result = await http.post(`/News/NewsDissLike/${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
