import axiosInstance from "@/config/axios";

export const createCommentRequest = async ({
  token,
  content,
  postId,
  parentCommentId,
}) => {
  try {
    const response = await axiosInstance.post(
      "/comment/create",
      { content, postId, parentCommentId },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error while creating comment", error);
    throw error;
  }
};

export const getAllParentCommentOfPostRequest = async ({ token, postId }) => {
  try {
    const response = await axiosInstance.get(`/comment/comments/${postId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error from getAllParentCommentOfPostRequest", error);
    throw error;
  }
};

export const getRepliesOfCommentRequest = async ({
  token,
  parentCommentId,
}) => {
  try {
    console.log("parentCommentId: ", parentCommentId);
    const response = await axiosInstance.get(
      `/comment/replies/${parentCommentId}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error from getRepliesOfCommentRequest", error);
    throw error;
  }
};
