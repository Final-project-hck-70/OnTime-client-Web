import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex  ">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
