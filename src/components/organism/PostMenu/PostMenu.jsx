import { EllipsisVerticalIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const PostMenu = ({ isAuthor, onEdit, onDelete, onCopyLink }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      {/* Three dots button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <EllipsisVerticalIcon className="cursor-pointer" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 ">
          {isAuthor ? (
            <>
              {/* <button
                onClick={() => {
                  setOpen(false);
                  onEdit?.();
                }}
                className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 border-b"
              >
                Edit
              </button> */}
              <button
                onClick={() => {
                  setOpen(false);
                  onDelete?.();
                }}
                className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 border-b text-red-500"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  onSave?.();
                }}
                className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 border-b"
              >
                Copy Link
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onCopyLink?.();
                }}
                className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 border-b text-red-500"
              >
                Unfollow
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMenu;
