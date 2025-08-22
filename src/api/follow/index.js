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

export const getFollowerRequest = async ({ token, targetUserId }) => {
  try {
    const response = await axiosInstance.get(
      `/follow/followers/${targetUserId}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error in getFollowerRequest", error);
    throw error;
  }
};

export const getFollowingRequest = async ({ token, targetUserId }) => {
  try {
    const response = await axiosInstance.get(
      `/follow/following/${targetUserId}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error in getFollowingRequest", error);
    throw error;
  }
};

export const getPendingFollowRequest = async ({ token }) => {
  try {
    const response = await axiosInstance.get("/follow-request/all-request", {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error from getPendingFollowRequest", error);
    throw error;
  }
};

export const acceptPendingRequest = async ({ id, token }) => {
  try {
    const response = await axiosInstance.post(
      "/follow-request/accept",
      { id },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error from accept pending request", error);
    throw error;
  }
};

export const deletePendingRequest = async ({ id, token }) => {
  try {
    const response = await axiosInstance.delete(
      "/follow-request/delete",

      {
        data: { id },
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error from delete pending request", error);
    throw error;
  }
};
