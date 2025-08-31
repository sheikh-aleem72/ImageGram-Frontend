import axiosConfig from "@/config/axios";
import axios from "axios";

export const getPresignedUrl = async ({ token }) => {
  try {
    const response = await axiosConfig.get("/cloudinary/pre-signed-url", {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data;
  } catch (error) {
    console.log("Error in getPresignedUrl :-", error);
    throw error;
  }
};

export const uploadImageToCloudinaryUsingPresignedUrl = async (
  URL,
  formData,
  config
) => {
  try {
    const response = await axios.post(URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    });

    return response?.data;
  } catch (error) {
    console.log("Error while uploading image to cloudinary:- ", error);
    throw error;
  }
};
