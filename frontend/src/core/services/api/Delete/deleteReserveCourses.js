import http from "../../../interceptor/interceptor.js";
export const deleteReserveCourses = async (id) => {
  try {
    const result = await http.delete("/CourseReserve", {
      data: { id: id },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
