import { uploadImageToCloudinaryUsingPresignedUrl } from "@/api/cloudinary";
import { useMutation } from "@tanstack/react-query";

export const useUploadImageToCloudinary = () => {
  const { mutateAsync: uploadImageToCloudinarypresignedUrlMutation } =
    useMutation({
      mutationFn: (data) =>
        uploadImageToCloudinaryUsingPresignedUrl(
          data.URL,
          data.formData,
          data.config
        ),
      onSuccess: (data) => {
        console.log("Image uploaded successfully");
      },
      onError: (error) => {
        console.log("Error while uploading image", error);
      },
    });

  return { uploadImageToCloudinarypresignedUrlMutation };
};
