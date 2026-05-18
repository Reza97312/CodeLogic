import http from "../../../interceptor/interceptor.js";

export const UpdateProfileInfo = async (data) => {
  try {
    const formData = new FormData();

    formData.append("LName", data.lastname);
    formData.append("FName", data.name);
    formData.append("UserAbout", data.aboutme);
    formData.append("LinkdinProfile", data.linkdin);
    formData.append("TelegramLink", data.telegram);
    formData.append("ReceiveMessageEvent", data.receiveMessageEvent ?? false);
    formData.append("HomeAdderess", data.adress);
    formData.append("NationalCode", data.nationalcode);
    formData.append(
      "Gender",
      data.gender === "male"
        ? true
        : data.gender === "female"
        ? false
        : data.gender
    );
    formData.append("BirthDay", data.birthday);
    formData.append("Latitude", data.lat);
    formData.append("Longitude", data.lng);

    const result = await http.put("/SharePanel/UpdateProfileInfo", formData);
    return result;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};
