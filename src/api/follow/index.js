import axiosInstance from "@/config/axios";

export const followUserRequest = async ({ targetUserId, token }) => {
  try {
    const response = await axiosInstance.post(
      "/follow/",
      {
        targetUserId,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error from follow user request", error);
    if (error.code === "ERR_NETWORK") {
      throw error;
    }
    throw error.response.data;
  }
};

export const getRelationshipStatusRequest = async ({ token, targetUserId }) => {
  try {
    const response = await axiosInstance.get(
      `/follow/relationship/${targetUserId}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error in get relationship status", error);
    throw error;
  }
};

export const unfollowUserRequest = async ({ token, targetUserId }) => {
  try {
    const response = await axiosInstance.delete("/follow/", {
      data: {
        targetUserId,
      },

      headers: {
        "x-access-token": token,
      },
    });

    return response;
  } catch (error) {
    console.log("Error in unFollowUser request! ", error);
    throw error;
  }
};

export const deleteFollowRequest = async ({ token, requestId }) => {
  try {
    const response = await axiosInstance.delete("/follow-request/delete", {
      data: {
        id: requestId,
      },
      headers: {
        "x-access-token": token,
      },
    });

    return response;
  } catch (error) {
    console.log("Error from delete follow request", error);
    throw error;
  }
};
