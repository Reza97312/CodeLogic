import http from "../../../interceptor/interceptor.js";

export const disLikeCourseComments = async (courseCommentId) => {
  try {
    const result = await http.post(`/Course/AddCourseCommentDissLike?CourseCommandId=${courseCommentId}`);
    console.log(result);
    return result;
  } 
  catch(err){
    console.log(err);
    throw err;
  }
};
