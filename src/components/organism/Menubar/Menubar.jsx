import { MenuItem } from "@/components/atoms/MenuItem/MenuItem";
import { OptionButton } from "@/components/atoms/OptionButton/OptionButton";
import {
  ApertureIcon,
  CircleUserIcon,
  CompassIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  MessageCircleIcon,
  SearchIcon,
  Settings2Icon,
  SquarePlusIcon,
} from "lucide-react";
import { useSelector } from "react-redux";

export const Menubar = () => {
  const user = useSelector((state) => state?.auth?.user);

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-200 flex justify-around items-center md:hidden z-50">
        <MenuItem Icon={HomeIcon} route={"/home"} />
        <MenuItem Icon={SearchIcon} route={"/search"} />
        <MenuItem Icon={SquarePlusIcon} route={"/create"} />
        <MenuItem Icon={HeartIcon} route={"/notification"} />
        <MenuItem image={`${user?.profilePicture}`} route={"/profile"} />
      </div>

      {/* Desktop Sidebar with Hover Expand */}
      <div
        className="hidden md:flex fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 group z-50
        w-[70px] hover:w-[240px] overflow-hidden"
      >
        <div className="flex flex-col justify-between w-full py-5">
          {/* Top section */}
          <div className="flex flex-col items-start gap-y-6 pl-4">
            <MenuItem
              Icon={ApertureIcon}
              label={"ImageGram"}
              route={"/home"}
              showLabelOnHover
            />
            <MenuItem
              Icon={HomeIcon}
              label={"Home"}
              route={"/home"}
              showLabelOnHover
            />
            <MenuItem
              Icon={SearchIcon}
              label={"Search"}
              route={"/search"}
              showLabelOnHover
            />
            <MenuItem
              Icon={CompassIcon}
              label={"Explore"}
              route={"/explore"}
              showLabelOnHover
            />
            <MenuItem
              Icon={SquarePlusIcon}
              label={"Create"}
              route={"/create"}
              showLabelOnHover
            />

            <MenuItem
              Icon={MessageCircleIcon}
              label={"Message"}
              route={"/message"}
              showLabelOnHover
            />
            <MenuItem
              Icon={HeartIcon}
              label={"Notification"}
              route={"/notification"}
              showLabelOnHover
            />

            <MenuItem
              image={`${user?.profilePicture}`}
              label={`${user?.username}`}
              route={`/userid`}
              showLabelOnHover
            />
          </div>

          {/* Bottom section */}
          <div className="flex flex-col items-start pl-4">
            <OptionButton Icon={MenuIcon} label={"Settings"} showLabelOnHover />
          </div>
        </div>
      </div>
    </>
  );
};
