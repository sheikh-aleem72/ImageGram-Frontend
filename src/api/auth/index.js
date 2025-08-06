import axios from "@/config/axios";

export const signupRequest = async ({ username, email, password }) => {
  try {
    const response = await axios.post("/users/signup", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("Error from signUpReqeust", error);
    if (error.code === "ERR_NETWORK") {
      throw error;
    }
    throw error.response.data;
  }
};
