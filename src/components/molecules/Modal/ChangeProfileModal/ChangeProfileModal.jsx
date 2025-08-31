import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/config/axios";
import { MODAL_KEYS } from "@/constants/modalKeys";
import { closeModal } from "@/features/slices/modalSlice";
import { useRemoveProfilePicture } from "@/Hooks/api/user/useRemoveProfilePicture";
import { useUpdateProfilePicture } from "@/Hooks/api/user/useUpdateProfilePicture";
import { useGetPresignedUrl } from "@/Hooks/cloudinary/useGetPresignedUrl";
import { useUploadImageToCloudinary } from "@/Hooks/cloudinary/useUploadImageToCloudinary";
import { Loader2, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChangeProfileModal = ({}) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { open } = useSelector(
    (state) => state.modal[MODAL_KEYS.CHANGE_PROFILE_PICTURE] ?? { open: false }
  );
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const abortController = useRef(null);

  const { getPreSignedUrlMutation } = useGetPresignedUrl();
  const { uploadImageToCloudinarypresignedUrlMutation } =
    useUploadImageToCloudinary();
  const { updateprofilepictureMutation } = useUpdateProfilePicture();
  const { removeprofilepictureMutation } = useRemoveProfilePicture();

  function handleClose() {
    setImage(null);
    dispatch(closeModal(MODAL_KEYS.CHANGE_PROFILE_PICTURE));
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  async function handleUpload() {
    if (!image) return alert("Please select an image first.");

    try {
      const response = await updateprofilepictureMutation(imageUrl);
    } catch (error) {
      throw error;
    }

    handleClose();
  }

  function cancelUpload() {
    if (abortController) {
      abortController.current.abort();
      setImage(null);
      setImageUrl(null);
    }
  }

  async function handleRemovePhoto() {
    try {
      const response = await removeprofilepictureMutation();
    } catch (error) {
      throw error;
    }
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="rounded-xl overflow-hidden max-w-sm">
        <DialogHeader className="p-4">
          <DialogTitle className="text-center text-[1.4rem] font-semibold">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col divide-y ">
          {/* Upload */}

          <button
            className={`py-3 text-blue-600 border-t justify-center font-medium cursor-pointer hover:bg-gray-50 ${
              image ? "hidden" : "flex"
            }`}
            onClick={handleUploadClick}
          >
            Upload Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              handleImageUpload(e.target.files[0]);
            }}
          />

          {/* Preview + Confirm Upload */}

          {image && (
            <div className="p-2 flex flex-col items-center gap-2">
              <div className="relative flex-col  flex items-center justify-center group/image">
                <button
                  className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center"
                  onClick={cancelUpload}
                >
                  <XIcon className="size-4 cursor-pointer" />
                </button>
                {/* Image Preview */}
                <img
                  src={URL.createObjectURL(image)}
                  className={`rounded-xl border object-cover w-24 h-24 transition ${
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
              <button
                className="text-white px-4 bg-imagegram-primary cursor-pointer hover:bg-imagegram-accent py-2 rounded-md"
                onClick={handleUpload}
                disabled={uploading}
              >
                Confirm Upload
              </button>
            </div>
          )}

          {/* Remove */}
          <button
            className="py-3 text-red-500 font-medium cursor-pointer hover:bg-gray-50"
            onClick={handleRemovePhoto}
          >
            Remove Current Photo
          </button>

          {/* Cancel */}
          <button
            className="py-3 text-gray-700 cursor-pointer hover:bg-gray-50"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeProfileModal;
