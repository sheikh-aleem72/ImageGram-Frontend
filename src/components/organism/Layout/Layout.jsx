import { Outlet } from "react-router-dom";
import Menubar from "../Menubar/Menubar";
import Navbar from "../Navbar/Navbar";

const Layout = ({}) => {
  return (
    <>
      <div className="h-[100vh]">
        <Navbar />
        <Outlet />
        <Menubar />
      </div>
    </>
  );
};

export default Layout;
