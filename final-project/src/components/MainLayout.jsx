import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex h-full m-0 ">
        <div className="bg-red-500 w-1/6">
          <Sidebar />
        </div>
        <div className="bg-blue-500 w-5/6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
