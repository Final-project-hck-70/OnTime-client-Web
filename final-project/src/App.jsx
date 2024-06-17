import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LeavesReport from "./pages/LeavesReport";
import OvertimeReport from "./pages/OvertimeReport";
import History from "./pages/History";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import DetailEmployee from "./pages/DetailEmployee";
import Cookies from "js-cookie";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      loader: () => {
        if (Cookies.get("token")) {
          return redirect("/");
        }
        return null;
      },
    },
    {
      element: <MainLayout />,
      loader: () => {
        if (!Cookies.get("token")) {
          return redirect("/login");
        }
        return null;
      },
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

  return <RouterProvider router={router} />;
}

export default App;
