import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/slices/authSlice";
import { LucideLogOut, LucideSettings2 } from "lucide-react";
import { useDispatch } from "react-redux";

const OptionButton = ({ Icon, label, showLabelOnHover }) => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(logout());
  }
  return (
    <>
      <div className="flex items-center gap-x-4 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-400 w-full cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none relative">
            <Icon className="w-6 h-6 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleClick}>
              <LucideLogOut className="size-4 mr-2 h-10" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {showLabelOnHover && (
          <span className="hidden group-hover:inline text-base font-medium">
            {label}
          </span>
        )}
      </div>
    </>
  );
};

export default OptionButton;
