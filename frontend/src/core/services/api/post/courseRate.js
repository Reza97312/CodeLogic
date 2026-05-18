import http from "../../../interceptor/interceptor.js";

export const courseRate = async (courseId, rateNumber) => {
  try {
    const result = await http.post(
      `/Course/SetCourseRating?CourseId=${courseId}&RateNumber=${rateNumber}`
    );
    console.log(result);
    return result;
  } 
  catch(err){
    console.log(err);
    throw err;
  }
};
