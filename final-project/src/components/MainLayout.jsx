import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <>
      <div className="flex h-screen">
        <div className=" w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6">
          <div>
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
