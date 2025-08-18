import { Button } from "@/components/ui/button";
import { useGetRelationshipStatus } from "@/Hooks/follow/useGetRelationshipStatus";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useFollowUser } from "@/Hooks/follow/useFollowUser";
import { useUnfollowUser } from "@/Hooks/follow/useUnfollowUser";
import { useDeleteFollowRequest } from "@/Hooks/follow/useDeleteFollowRequest";

export const FollowButton = ({ userId, privacy }) => {
  const { isPending, relationshipStatus, refetch } =
    useGetRelationshipStatus(userId);
  const { followUserMutation } = useFollowUser();
  const { unFollowUserMutation } = useUnfollowUser();
  const { deleteFollowRequestMutation } = useDeleteFollowRequest();

  // local override state for optimistic update
  const [optimisticStatus, setOptimisticStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // pick current relationship (prefer optimistic, else server value)
  const currentStatus = optimisticStatus || relationshipStatus?.relationship;

  const buttonType = {
    not_following: "bg-imagegram-primary hover:bg-imagegram-accent ",
    Following: "bg-gray-200 hover:bg-gray-300 text-imagegram-text",
    Requested: "bg-gray-200 hover:bg-gray-300 text-imagegram-text",
  };

  let value = currentStatus === "not_following" ? "Follow" : currentStatus;

  async function handleClick() {
    try {
      setLoading(true);

      if (currentStatus === "not_following") {
        // Optimistic UI
        if (privacy == "private") {
          setOptimisticStatus("Requested");
        } else {
          setOptimisticStatus("Following");
        }
        await followUserMutation(userId);
      } else if (currentStatus == "Following") {
        setOptimisticStatus("not_following");
        await unFollowUserMutation(userId);
      } else if (currentStatus == "Requested") {
        setOptimisticStatus("not_following");
        await deleteFollowRequestMutation(relationshipStatus?.data?._id);
      }
      // refetch to sync final truth
      refetch();
    } catch (err) {
      console.error(err);
      // rollback optimistic status
      setOptimisticStatus(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={`${
        buttonType[currentStatus] ?? "bg-imagegram-primary"
      } cursor-pointer text-xl rounded-sm p-4`}
      disabled={loading}
    >
      {loading || isPending ? <Loader2 className="animate-spin" /> : value}
    </Button>
  );
};
