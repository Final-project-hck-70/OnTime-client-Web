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
        <div className="navbar-center w-80 hidden lg:flex">
          <div className="pt-2 relative mx-auto  text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-80 "
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="navbar-end mr-10">
          <a className="btn">Logout</a>
        </div>
      </div>
    </>
  );
}
