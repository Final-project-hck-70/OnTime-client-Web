import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-40 ">
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
                <a>Dashboard</a>
              </li>
              <li>
                <a>Report</a>
                <ul className="p-2">
                  <li>
                    <a>Report Overtime</a>
                  </li>
                  <li>
                    <a>Report Cuti</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>History</a>
              </li>
              <li>
                <a>Employees</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">OnTime</a>
        </div>

        <div className="navbar-end mr-10">
          <a className="btn">Logout</a>
        </div>
      </div>
    </>
  );
}
