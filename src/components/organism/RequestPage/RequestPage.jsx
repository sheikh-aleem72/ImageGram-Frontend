import RequestCard from "@/components/molecules/RequestCard/RequestCard";
import { useGetPendingFollowRequest } from "@/Hooks/follow/useGetPendingFollowRequest";
import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RequestPage() {
  const navigate = useNavigate();

  const { isPending, isSuccess, data } = useGetPendingFollowRequest();

  // Track mobile layout
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive changes (mobile/desktop)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const requestList = (
    <div>
      {data &&
        data.map((request, index) => (
          <RequestCard
            key={index}
            username={request?.sender?.username}
            profilePicture={request?.sender?.profilePicture}
            userId={request?.sender?._id}
            requestId={request?._id}
          />
        ))}
    </div>
  );

  // Render mobile layout
  if (isMobile) {
    return (
      <div className="p-4 mt-[70px]">
        <h1 className="text-lg font-bold mb-3">Requests</h1>
        {requestList}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-start z-50 md:ml-[70px]">
      <div className="bg-white p-6 shadow-xl w-[400px] relative h-full">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-gray-500"
        >
          <XIcon className="cursor-pointer" />
        </button>
        <h1 className="text-lg font-bold mb-3">Requests</h1>
        {requestList}
      </div>
    </div>
  );
}

export default RequestPage;
