import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <>
      <div className="navbar bg-base-100  ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="cursor-pointer">Dashboard</a>
              </li>
              <li>
                <a className="cursor-pointer">Report</a>
                <ul className="p-2">
                  <li>
                    <a className="cursor-pointer">Report Overtime</a>
                  </li>
                  <li>
                    <a className="cursor-pointer">Report Cuti</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="cursor-pointer">History</a>
              </li>
              <li>
                <a className="cursor-pointer">Employees</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-end ">
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
