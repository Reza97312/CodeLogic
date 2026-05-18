import http from "../../../interceptor/interceptor.js";
export const DeleteLikeNews = async (id) => {
  try {
    const result = await http.delete("/News/DeleteLikeNews", {
      data: { deleteEntityId: id },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
