import http from "../../../interceptor/interceptor.js";
export const UpdateNotifications = async (id) => {
  try {
    const url = `/v2/notification/alert/see/${id}`;
    const result = await http.patch(url);

    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
