import React from "react";
import { Link } from "react-router-dom";

function NotificationRow({ index, style, data }) {
  // Destructure custorm arguments passed to NotificationRow through List
  const { isItemLoaded, notifications } = data;

  // Check if the next item is loaded or not using function
  if (!isItemLoaded(index)) {
    return (
      <div style={style} className="p-3 text-gray-400">
        Loading...
      </div>
    );
  }

  const notification = notifications[index];

  const notificationText = {
    follow: `Started following you`,
    like: `Liked your photo`,
    comment: `Commented`,
    accept: `Has accepted your request`,
    request: `Has sent you a follow request`,
  };

  const paths = {
    follow: `/${notification?.sender?._id}`,
    like: `/`,
    comment: `/`,
    accept: `/${notification?.sender?._id}`,
    request: `/notifications/requests`,
  };

  return (
    <Link to={`${paths[notification?.type]}`}>
      <div
        style={style}
        className="flex items-center gap-3 p-3 border-b border-gray-200 hover:bg-gray-100 transition"
      >
        <img
          src={notification?.sender?.profilePicture}
          className="h-8 w-8 rounded-full"
        />

        <span className="text-gray-800">
          <span className="text-imagegram-text font-semibold text-lg">
            {notification?.sender?.username}
          </span>{" "}
          {notificationText[notification.type]}
        </span>
        <span className="text-gray-500 text-sm ml-auto">
          {(() => {
            const now = Date.now();
            const createdAt = new Date(notification?.createdAt).getTime();
            const diffMs = now - createdAt;
            const diffSec = Math.floor(diffMs / 1000);
            if (diffSec < 60) return `${diffSec}s ago`;
            const diffMin = Math.floor(diffSec / 60);
            if (diffMin < 60) return `${diffMin}m ago`;
            const diffHr = Math.floor(diffMin / 60);
            if (diffHr < 24) return `${diffHr}h ago`;
            const diffDay = Math.floor(diffHr / 24);
            return `${diffDay}d ago`;
          })()}
        </span>
      </div>
    </Link>
  );
}

export default NotificationRow;
