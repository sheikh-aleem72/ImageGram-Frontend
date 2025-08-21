import MenuItem from "@/components/atoms/MenuItem/MenuItem";
import OptionButton from "@/components/atoms/OptionButton/OptionButton";
import Imagegram_logo from "@/assets/Images/Imagegram_logo.png";
import {
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

const Menubar = () => {
  const user = useSelector((state) => state?.auth?.user);
  const unreadNotificationsCount = useSelector(
    (state) => state?.notificationsCount?.unreadNotificationsCount
  );

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-200 flex justify-around items-center md:hidden z-50">
        <MenuItem Icon={HomeIcon} route={"/home"} />
        <MenuItem Icon={SearchIcon} route={"/search"} />
        <MenuItem Icon={SquarePlusIcon} route={"/create"} />
        <MenuItem
          Icon={HeartIcon}
          route={"/notifications"}
          count={unreadNotificationsCount}
        />
        <MenuItem image={`${user?.profilePicture}`} route={`/${user?.id}`} />
      </div>

      {/* Desktop Sidebar with Hover Expand */}
      <div
        className="hidden md:flex fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 group z-50
        w-[70px] overflow-hidden md:justify-center"
      >
        <div className="flex flex-col justify-between w-full py-5">
          {/* Top section */}
          <div className="flex flex-col items-start gap-y-6 pl-4">
            <MenuItem
              image={Imagegram_logo}
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
              route={"/notifications"}
              count={unreadNotificationsCount}
              showLabelOnHover
            />

            <MenuItem
              image={`${user?.profilePicture}`}
              label={`${user?.username}`}
              route={`/${user?.id}`}
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

export default Menubar;
