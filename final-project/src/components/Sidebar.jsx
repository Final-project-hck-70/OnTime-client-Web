import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className=" md:flex sm:hidden w-full bg-red-700 h-screen  text-white rounded-md sticky top-0">
        <ul className="-my-2 divide-y divide-gray-100 w-full ">
          <li className="py-2">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="block rounded-lg  px-4 py-2 text-2xl font-bold  cursor-pointer "
                >
                  OnTime
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block rounded-lg  px-4 py-2 text-sm font-medium  cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                >
                  Dashboard
                </Link>
              </li>
              <li className="block rounded-lg px-4 py-2 text-sm font-medium  ">
                <details className="">
                  <summary className="cursor-pointer">Report</summary>
                  <ul className="p-2">
                    <li className="  block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-black">
                      <Link to="/report/overtimes" className="cursor-pointer">
                        Overtime
                      </Link>
                    </li>
                    <li className=" block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-gray-700">
                      <Link to="/report/leaves" className="cursor-pointer">
                        Leaves
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link
                  to="/histories"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-black"
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  to="/employees"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-100 hover:text-black"
                >
                  Employees
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
