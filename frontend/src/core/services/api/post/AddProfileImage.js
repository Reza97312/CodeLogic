import http from "../../../interceptor/interceptor.js";

export const AddProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("formFile", file);

    const result = await http.post("/SharePanel/AddProfileImage", formData, {});

    return result;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};
