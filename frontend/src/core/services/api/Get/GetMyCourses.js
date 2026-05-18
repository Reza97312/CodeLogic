import Http from "../../../interceptor/interceptor";

const GetMyCourses = async (params) => {
  try {
    const result = await Http.get("/SharePanel/GetMyCourses", { params });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default GetMyCourses;
