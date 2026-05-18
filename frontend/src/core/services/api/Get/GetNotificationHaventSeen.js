import http from "../../../interceptor/interceptor.js";
export const GetNotificationHaventSeen = async () => {
  try {
    const result = await http.get("/v2/notification/alert/mineNoSeen");
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
