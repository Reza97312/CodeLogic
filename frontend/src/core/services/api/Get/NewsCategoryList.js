import Http from "../../../interceptor/interceptor";

const getNewsCategoryList = async (payload) => {
  try {
    const result = await Http.get("/News/GetListNewsCategory", payload);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getNewsCategoryList;
