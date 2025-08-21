import axiosInstance from "@/config/axios";

export const fetchAllNotificationsRequest = async ({
  token,
  receiverId,
  beforeCursor,
}) => {
  try {
    const response = await axiosInstance.get(`/notifications/${receiverId}`, {
      headers: {
        "x-access-token": token,
      },
      params: {
        beforeCursor,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error from fetchAllNotificationsRequest", error);
    throw error;
  }
};
