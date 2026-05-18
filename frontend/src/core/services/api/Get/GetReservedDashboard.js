import Http from "../../../interceptor/interceptor";

const GetReservedDashboard = async (params) => {
  try {
    const result = await Http.get("/SharePanel/GetMyCoursesReserve", {
      params,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default GetReservedDashboard;
