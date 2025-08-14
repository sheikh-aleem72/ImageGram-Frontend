import { Button } from "@/components/ui/button";

export const FollowButton = ({ userId }) => {
  async function handleClick() {
    console.log("Follow button click!");
  }
  return (
    <>
      <Button
        onClick={handleClick}
        className={
          "bg-imagegram-primary hover:bg-imagegram-accent cursor-pointer"
        }
      >
        Follow
      </Button>
    </>
  );
};
