export default function Employees() {
  return (
    <>
      <main className="  h-full  items-center justify-center  p-4   ">
        <header className="bg-red-200 mb-6 p-2">
          <section>
            <h1 className="text-2xl font-bold">List of employees</h1>
            <p className="text-xs text-gray-700 font-md">
              Dashboard &gt; Report &gt; Employees
            </p>
          </section>
        </header>
        <main className=" bg-gray-300 p-4 ">
          <div className="flex justify-between  mb-6">
            <div>
              <div className="bg-blue-500 rounded-md text-white font-semibold shadow-2xl cursor-pointer hover:bg-blue-800 p-2">
                Add Employee
              </div>
            </div>
            <div className=" w-80 hidden lg:flex">
              <div className=" relative mx-auto  text-gray-600">
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-80 "
                  type="search"
                  name="search"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-5 mr-4"
                >
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
          </div>
          <div className="my-6">
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead className="text-center">
                  <tr>
                    <th>No</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Position</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <th>1</th>
                    <td>
                      <img
                        className="rounded-full w-14 h-14 m-auto"
                        src="https://openpsychometrics.org/tests/characters/test-resources/pics/S/2.jpg"
                        alt=""
                      />
                    </td>
                    <td>Bart Simpson</td>
                    <td>Simpson & Co</td>
                    <td>Sales Manager</td>
                    <td className="m-auto">
                      <div className="flex gap-2 justify-center">
                        <svg
                          className="fill-red-700 w-4 h-4 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="100"
                          height="100"
                          viewBox="0 0 24 24"
                        >
                          <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                        </svg>
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </main>
    </>
  );
}
