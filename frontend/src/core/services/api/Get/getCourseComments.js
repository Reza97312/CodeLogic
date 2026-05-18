import Http from "../../../interceptor/interceptor";

const getCourseCommnets = async (courseId) => {
  try {
    const result = await Http.get(`/Course/GetCourseCommnets/${courseId}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getCourseCommnets;
