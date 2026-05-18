import http from "../../../interceptor/interceptor.js";

export const NewsRate = async (newsId, rateNumber) => {
  try {
    const result = await http.post(
      `/News/NewsRate?NewsId=${newsId}&RateNumber=${rateNumber}`
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
