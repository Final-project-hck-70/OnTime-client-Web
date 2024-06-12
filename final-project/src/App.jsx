import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LeavesReport from "./pages/LeavesReport";
import OvertimeReport from "./pages/OvertimeReport";
import History from "./pages/History";
import Employees from "./pages/Employees.jsx";
import AddEmployee from "./pages/AddEmployee";
import DetailEmployee from "./pages/DetailEmployee";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/report/leaves", element: <LeavesReport /> },
        { path: "/report/overtimes", element: <OvertimeReport /> },
        { path: "/histories", element: <History /> },
        { path: "/employees", element: <Employees /> },
        { path: "/employees/add-employees", element: <AddEmployee /> },
        { path: "/employees/:id", element: <DetailEmployee /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
