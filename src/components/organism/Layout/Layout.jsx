import { Menubar } from "../Menubar/Menubar";
import { Navbar } from "../Navbar/Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="h-[100vh]">
        <Navbar />
        {children}
        <Menubar />
      </div>
    </>
  );
};
