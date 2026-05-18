import Http from "../../../interceptor/interceptor";

const myCourseComments = async () => {
  try {
    const result = await Http.get("/SharePanel/GetMyCoursesComments");
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default myCourseComments;
