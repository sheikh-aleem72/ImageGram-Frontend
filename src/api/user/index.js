import axiosInstance from "@/config/axios";
import axios from "@/config/axios";

export const getUserDetailsRequest = async ({ userId, token }) => {
  try {
    const response = await axios.get(
      `/users/${userId}`, // We can't send body into axios in get request
      {
        headers: { "x-access-token": token },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log("Error from get user detail request", error);
    if (error.code === "ERR_NETWORK") {
      throw error;
    }
    throw error.response.data;
  }
};

export const updateProfilePictureRequest = async ({ token, imageURL }) => {
  try {
    const response = await axiosInstance.post(
      "/users/updateprofilepicture",
      {
        imageURL,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data;
  } catch (error) {
    console.log("Error while changing profile picture!!", error);
    throw error;
  }
};

export const removeProfilePictureRequest = async ({ token }) => {
  try {
    const response = await axiosInstance.post(
      "/users/removeprofilepicture",
      {}, // If we don't send empty body then we will gate 502 bad gateway error.
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data;
  } catch (error) {
    console.log("Error while removing profile picture: ", error);
    throw error;
  }
};
