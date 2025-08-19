import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDetails } from "@/Hooks/api/user/useGetUserDetails";
import { useUpdateUserDetails } from "@/Hooks/api/user/useUpdateUserDetails";
import { toast } from "sonner";

const EditProfile = ({}) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
    gender: "",
    privacy: "public",
  });

  const {
    isFetching,
    isSuccess,
    error,
    userDetails: details,
  } = useGetUserDetails(userId);

  const { updateUserDetailsMutation } = useUpdateUserDetails();

  // ✅ Load existing values into state when details change
  useEffect(() => {
    if (isSuccess) {
      setForm({
        name: details?.name || "",
        username: details?.username || "",
        bio: details?.bio || "",
        gender: details?.gender || "",
        accountPrivacy: details?.accountPrivacy || "public",
      });
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Username validation: only letters, numbers, underscores, 3–15 chars
    if (name === "username") {
      const usernamePattern = /^[a-zA-Z0-9_]{3,15}$/;
      if (value !== "" && !usernamePattern.test(value)) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const updateFields = {};
    Object.keys(form).forEach((key) => {
      if (form[key] !== details[key]) {
        updateFields[key] = form[key];
      }
    });

    const response = await updateUserDetailsMutation(updateFields);
    navigate(`/${userId}`);
    toast("Details updated successfully!");
  }

  return (
    <form
      className="max-w-md mx-auto space-y-6 mt-20 px-4 sm:px-0"
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="block text-lg font-semibold">Name</label>
        <Input name="name" value={form.name} onChange={handleChange} />
      </div>

      {/* Username */}
      <div className="flex flex-col gap-2">
        <label className="block text-lg font-semibold">Username</label>
        <Input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <p className="text-sm text-gray-500">
          Only letters, numbers, underscores (3–15 characters)
        </p>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <label className="block text-lg font-semibold">Bio</label>
        <Textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Add a short bio"
        />
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-2">
        <label className="block text-lg font-semibold">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Privacy */}
      <div className="flex flex-col gap-2">
        <label className="block text-lg font-semibold">Account Privacy</label>
        <select
          name="privacy"
          value={form.accountPrivacy}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Submit */}
      <div className="text-right">
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
