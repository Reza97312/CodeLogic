import http from "../../../interceptor/interceptor.js";

export const reserveCourses = async (params) => {
  try {
    const result = await http.post("/CourseReserve/ReserveAdd", {
      courseId: params,
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
