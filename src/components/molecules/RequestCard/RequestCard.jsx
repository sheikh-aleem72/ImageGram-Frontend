import FollowButton from "@/components/atoms/FollowButton/FollowButton";
import { Button } from "@/components/ui/button";
import { useAcceptPendingRequest } from "@/Hooks/follow/useAcceptPendingRequest";
import { useDeletePendingRequest } from "@/Hooks/follow/useDeletePendingRequest";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function RequestCard({ username, profilePicture, userId, requestId }) {
  const [loading, setLoading] = useState(false);

  const { acceptPendingRequestMutation } = useAcceptPendingRequest();
  const { deletePendingRequestMutation } = useDeletePendingRequest();
  async function handleConfirm(e) {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    await acceptPendingRequestMutation(requestId);

    setLoading(false);
  }

  async function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    await deletePendingRequestMutation(requestId);

    setLoading(false);
  }

  return (
    <Link to={`/${userId}`}>
      <div className="flex justify-between items-center bg-imagegram-bg p-2 cursor-pointer rounded-sm">
        <div className="flex items-center gap-2">
          <img
            src={profilePicture}
            alt={`${username}'s profile`}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />

          <p className="text-imagegram-text font-semibold text-xl">
            {username}
          </p>
        </div>
        <div className="flex gap-2 ">
          <Button
            onClick={handleConfirm}
            className={`bg-imagegram-primary cursor-pointer text-md rounded-sm p-2 min-w-[80px]`}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Confirm"}
          </Button>
          <Button
            onClick={handleDelete}
            className={`bg-gray-200 hover:bg-gray-300 text-imagegram-text cursor-pointer text-md rounded-sm p-2 min-w-[80px]`}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default RequestCard;
