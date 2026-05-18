import Http from "../../../interceptor/interceptor";

const GetProfileInfo = async () => {
  try {
    const result = await Http.get("/SharePanel/GetProfileInfo");

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetProfileInfo;
