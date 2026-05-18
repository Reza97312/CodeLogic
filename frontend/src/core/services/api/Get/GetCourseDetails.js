import Http from "../../../interceptor/interceptor";

const GetCourseDetails = async (id) => {
  try {
    const result = await Http.get(`/Course/${id} `);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default GetCourseDetails;
