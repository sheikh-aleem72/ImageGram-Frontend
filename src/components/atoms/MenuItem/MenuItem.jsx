import { Link } from "react-router-dom";

const MenuItem = ({ Icon, label, route, showLabelOnHover, image, count }) => {
  return (
    <Link
      to={route}
      className="flex items-center gap-x-4 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-400 w-full relative"
    >
      <div className="relative flex items-center">
        {image ? (
          <img
            src={image}
            className="md:w-7 md:h-7 w-8 h-8 rounded-2xl object-cover"
          />
        ) : (
          <Icon className="md:w-7 md:h-7 rounded-md w-8 h-8" />
        )}
        {count > 0 && (
          <div className="absolute -top-1 -right-1 flex justify-center items-center w-5 h-5 bg-red-400 rounded-full  border-white">
            <p className="text-xs text-white">{count}</p>
          </div>
        )}
      </div>
      {/* {showLabelOnHover && (
        <span className="hidden group-hover:inline text-base font-medium">
          {label}
        </span>
      )} */}
    </Link>
  );
};

export default MenuItem;
