import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { XIcon } from "lucide-react";

const NotificationPage = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  // Close modal on ESC (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleEsc = (e) => e.key === "Escape" && navigate(-1);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMobile, navigate]);

  if (isMobile) {
    // 📱 Full page
    return (
      <div className="p-4 mt-[70px]">
        <h1 className="text-xl font-bold mb-2">Notifications</h1>
        <p>List of notifications...</p>
      </div>
    );
  }

  // 💻 Modal for desktop
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-start z-50 md:ml-[70px]">
      <div className="bg-white p-6 shadow-xl w-[400px] relative h-full">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-gray-500"
        >
          <XIcon className="cursor-pointer" />
        </button>
        <h1 className="text-lg font-bold mb-3">Notifications</h1>
        <p>List of notifications...</p>
      </div>
    </div>
  );
};

export default NotificationPage;
