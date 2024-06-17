import rejectButton from "../assets/x.png";

export default function OvertimeReport() {
  return (
    <>
      <main className="  h-full  items-center justify-center  p-4  h-screen ">
        <header className="bg-white rounded-md shadow-xl mb-6 p-2">
          <section>
            <h1 className="text-2xl font-bold">Overtime Report</h1>
            <p className="text-xs text-gray-700 font-md">
              Dashboard &gt; Report &gt; Overtime
            </p>
          </section>
        </header>
        <main className=" bg-white shadow-xl rounded-md shadow-3xl p-4  ">
          <div className="flex justify-end  mb-6">
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
                  className="absolute right-0 top-0 mt-3 mr-4"
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
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Delegate user</th>
                    <th>Created at</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Littel, Schaden and Vandervort</td>
                    <td>Canada</td>
                    <td>John Doe</td>
                    <td>12/16/2020</td>
                    <td>
                      <td className="m-auto">
                        <div className="flex gap-2 justify-center">
                          <div
                            data-tooltip-target="tooltip-default"
                            className="bg-green-500 rounded-md shadow-2xl p-1 cursor-pointer"
                          >
                            <svg
                              className="w-4 h-4  fill-white  "
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="100"
                              height="100"
                              viewBox="0 0 50 50"
                            >
                              <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                            </svg>
                          </div>
                          <div
                            data-tooltip-target="tooltip-default"
                            className="bg-red-500 rounded-md shadow-2xl p-1 cursor-pointer"
                          >
                            <img
                              className="w-4 h-4"
                              src={rejectButton}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
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
