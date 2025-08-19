import MenuItem from "@/components/atoms/MenuItem/MenuItem";
import { HeartIcon } from "lucide-react";

const Navbar = ({}) => {
  return (
    <>
      <div className="fixed top-0 w-full md:hidden h-70px bg-imagegram-bg flex justify-between items-center p-2">
        <div className="">
          <h1 className="text-imagegram-text text-2xl px-2">ImageGram</h1>
        </div>
        <div className="">
          <MenuItem Icon={HeartIcon} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
