import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetPresignedUrl } from "@/Hooks/cloudinary/useGetPresignedUrl";
import { useUploadImageToCloudinary } from "@/Hooks/cloudinary/useUploadImageToCloudinary";
import { useCreatePost } from "@/Hooks/post/useCreatePost";
import { ImagePlusIcon, Loader2, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");

  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const abortController = useRef(null);

  const { getPreSignedUrlMutation } = useGetPresignedUrl();
  const { uploadImageToCloudinarypresignedUrlMutation } =
    useUploadImageToCloudinary();
  const { isPending, isSuccess, createPostMutation } = useCreatePost();

  // Track screen size (mobile)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  function handleUploadClick() {
    fileInputRef.current.click();
  }

  async function handleUpload(e) {
    if (!image) return alert("Please select an image first.");
    console.log("Uploading file:", imageUrl, caption);

    try {
      // Call Api for create post
      const response = await createPostMutation({ imageUrl, caption });
      console.log("Post created successfully", response);
      setImage(null);
      setImageUrl(null);
      navigate(`/post/${response?._id}`);
    } catch (error) {
      throw error;
    }
  }

  async function handleImageUpload(file) {
    if (!file) return;
    setUploading(true);
    setImage(file);
    abortController.current = new AbortController();

    try {
      const presignedUrlData = await getPreSignedUrlMutation();

      const { uploadUrl, signature, timestamp, apiKey, folder } =
        presignedUrlData;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      const response = await uploadImageToCloudinarypresignedUrlMutation({
        URL: uploadUrl,
        formData,
        config: { signal: abortController.current.signal },
      });

      setImageUrl(response?.secure_url);
    } catch (error) {
      if (axiosInstance.isCancel(error)) {
        console.log("Image upload canceled");
      } else {
        console.error("Image upload failed", error);
      }
    } finally {
      setUploading(false);
    }
  }

  function cancelUpload() {
    if (abortController) {
      abortController.current.abort();
      setImage(null);
      setImageUrl(null);
    }
  }

  function handleChange(e) {
    setCaption(e.target.value);
  }

  const content = (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
      {!image && (
        <div className="flex flex-col gap-4 items-center md:mt-20">
          <ImagePlusIcon className="w-[100px] h-[100px]" />
          <h1 className="text-imagegram-text text-xl">
            Post your pictures here
          </h1>
          <Button
            className={`bg-imagegram-primary hover:bg-imagegram-accent cursor-pointer ${
              image ? "hidden" : "flex"
            }`}
            onClick={handleUploadClick}
          >
            Select from this device
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              handleImageUpload(e.target.files[0]);
            }}
          />
        </div>
      )}

      {/* Preview + Confirm Upload */}

      {image && (
        <div className="p-2 flex items-center flex-col md:flex-row gap-2 ">
          <div className="relative flex-col gap-2 flex items-center justify-center group/image">
            <button
              className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center"
              onClick={cancelUpload}
            >
              <XIcon className="size-4 cursor-pointer" />
            </button>
            {/* Image Preview */}
            <img
              src={URL.createObjectURL(image)}
              className={`rounded-xl border object-cover w-[300px] h-[300px] transition ${
                uploading ? "blur-sm opacity-50" : "blur-0 opacity-100"
              }`}
            />

            {/* Loader Overlay while uploading */}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                <Loader2 className="size-6 animate-spin text-white" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className=" justify-center  flex flex-col">
              <label for="caption" className="block text-lg font-semibold">
                Enter caption for photo
              </label>
              <Textarea
                name="caption"
                className={"w-[300px]"}
                onChange={handleChange}
              />
            </div>
            <button
              className="text-white px-4 bg-imagegram-primary cursor-pointer hover:bg-imagegram-accent py-2 rounded-md"
              onClick={handleUpload}
              disabled={uploading}
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center">
        {content}
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 md:ml-[70px]">
      <div className="bg-white p-6 shadow-xl min-w-[400px] relative min-h-[400px] rounded-xl">
        <div className="border-b-2 pb-2 ">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-2 right-2 text-gray-500 p-2"
          >
            <XIcon className="cursor-pointer text-imagegram-text hover:text-imagegram-subtext" />
          </button>
          <h1 className="font-semibold">Create New Post</h1>
        </div>
        {content}
      </div>
    </div>
  );
}

export default CreatePostPage;
