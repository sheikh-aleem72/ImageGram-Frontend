import axios from "@/config/axios";

export const getUserDetailsRequest = async ({ userId, token }) => {
  try {
    const response = await axios.get(`/users/${userId}`, {
      headers: { "x-access-token": token },
    });

    return response.data.data;
  } catch (error) {
    console.log("Error from get user detail request", error);
    if (error.code === "ERR_NETWORK") {
      throw error;
    }
    throw error.response.data;
  }
};
