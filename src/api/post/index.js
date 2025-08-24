import axiosInstance from "@/config/axios";

export const createPostRequest = async ({ token, data }) => {
  try {
    const response = await axiosInstance.post(
      `/post/create-post`,
      {
        urls: data?.imageUrl,
        caption: data?.caption,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error from createPostRequest! ", error);
    throw error;
  }
};

export const getPostRequest = async ({ token, id }) => {
  try {
    const response = await axiosInstance.get(`/post/get-post/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error from getPostRequest: ", error);
    throw error;
  }
};

export const getAllPostOfUserRequest = async ({ token, userId }) => {
  try {
    const response = await axiosInstance.get(`/post/user/${userId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error from getAllPostOfUserRequest: ", error);
    throw error;
  }
};

export const deletePostRequest = async ({ token, postId }) => {
  try {
    const response = await axiosInstance.delete(`/post/delete/${postId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error from delete post request: ", error);
    throw error;
  }
};
