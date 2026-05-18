import http from "../../../interceptor/interceptor.js";

export const SelectPictureImage = async (imageId) => {
  try {
    const formData = new FormData();
    formData.append("ImageId", imageId);

    const result = await http.post(
      "/SharePanel/SelectProfileImage",
      formData,
      {}
    );

    return result;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};
