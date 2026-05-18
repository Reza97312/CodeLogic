import http from "../../../interceptor/interceptor.js";

export const addFavCourses = async (payload) => {
  try {
    const result = await http.post("/Course/AddCourseFavorite", {
      courseId: payload,
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);

    throw err;
  }
};
