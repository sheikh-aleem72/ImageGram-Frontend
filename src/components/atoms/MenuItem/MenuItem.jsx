export const MenuItem = ({ Icon, label, route, showLabelOnHover, image }) => {
  return (
    <>
      <a
        href={route}
        className="flex items-center gap-x-4 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-400 w-full"
      >
        {image ? (
          <img
            src={image}
            className="md:w-6 md:h-6 w-8 h-8 rounded-2xl object-cover"
          />
        ) : (
          <Icon className="md:w-6 md:h-6 rounded-md w-8 h-8" />
        )}
        {showLabelOnHover && (
          <span className="hidden group-hover:inline text-base font-medium">
            {label}
          </span>
        )}
      </a>
    </>
  );
};
