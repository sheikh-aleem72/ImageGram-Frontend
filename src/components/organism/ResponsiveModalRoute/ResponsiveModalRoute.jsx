import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";

export const ResponsiveModalRoute = ({ element: Element }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();

  if (isDesktop) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-[500px] max-h-[80vh] rounded-2xl shadow-lg overflow-y-auto">
          <Element isModal={true} onClose={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  // On mobile → render as normal page
  return <Element isModal={false} />;
};
