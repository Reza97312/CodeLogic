import Http from "../../../interceptor/interceptor";

const getCourseTechnologies = async () => {
  try {
    const result = await Http.get("/Home/GetTechnologies");
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getCourseTechnologies;
