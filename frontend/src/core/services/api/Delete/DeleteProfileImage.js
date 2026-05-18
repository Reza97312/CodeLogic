import http from "../../../interceptor/interceptor.js";

export const DeleteProfileImage = async (deleteEntityId) => {
  try {
    const formData = new FormData();
    formData.append("DeleteEntityId", deleteEntityId);

    const result = await http.delete("/SharePanel/DeleteProfileImage", {
      data: formData,
    });

    return result;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};
