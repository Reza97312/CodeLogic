import Http from "../../../interceptor/interceptor";

const getAllNews = async (payload) => {
  try {
    const result = await Http.get(
      "/News?PageNumber=1&RowsOfPage=10000&SortType=insertDate&SortingCol=DESC",
      payload
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getAllNews;
