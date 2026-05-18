import Http from "../../../interceptor/interceptor";

const getNewsDetails = async (id) => {
  try {
    const result = await Http.get(`/News/${id} `);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getNewsDetails;
