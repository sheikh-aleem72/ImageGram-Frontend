import axiosInstance from "@/config/axios";

export const getFeedRequest = async ({ token }) => {
  try {
    const response = await axiosInstance.get("/feed/", {
      headers: {
        "x-access-token": token,
      },
    });

    console.log("feed response: ", response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    console.log("Error in fetching feed", error);
    throw error;
  }
};
