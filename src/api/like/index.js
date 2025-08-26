import axiosInstance from "@/config/axios";

export const addLikeRequest = async ({ token, targetId, type }) => {
  try {
    const response = await axiosInstance.post(
      "/like/",
      {
        targetId,
        type,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error from addLikeRequest: ", error);
    throw error;
  }
};

export const removeLikeRequest = async ({ token, targetId, type }) => {
  try {
    const response = await axiosInstance.delete(
      "/like/",

      {
        data: {
          targetId,
          type,
        },
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error from removeLikeRequest: ", error);
    throw error;
  }
};

export const getLikeRequest = async ({ token, targetId, type }) => {
  try {
    const response = await axiosInstance.get(
      "/like/",

      {
        params: {
          targetId,
          type,
        },
        headers: {
          "x-access-token": token,
        },
      }
    );

    console.log("like response: ", response?.data?.data);

    return response?.data?.data;
  } catch (error) {
    console.log("Error from getLikeRequest: ", error);
    throw error;
  }
};
