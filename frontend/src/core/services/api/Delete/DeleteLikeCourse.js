import http from "../../../interceptor/interceptor.js";
export const DeleteLikeCourse = async (courseLikeId) => {
  const formData = new FormData();
  formData.append("CourseLikeId", courseLikeId);
  try {
    const result = await http.delete("/Course/DeleteCourseLike", {
      data: formData,
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
