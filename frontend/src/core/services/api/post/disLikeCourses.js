import http from "../../../interceptor/interceptor.js";

export const disLikeCourses = async (id) => {
  try {
    const result = await http.post(`/Course/AddCourseDissLike?CourseId=${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
