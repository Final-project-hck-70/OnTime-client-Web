import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import leaveImg from "../assets/travel.png";
import overtimeImg from "../assets/working-hours.png";
import Chart from "chart.js/auto";
import ChartBar from "../components/ChartBar";

export default function Dashboard() {
  return (
    <>
      <article className="bg-white shadow-2xl p-4 ">
        <section className=" flex items-center justify-around  text-center p-4">
          <div className="grid grid-cols-2 w-screen gap-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gray-400 blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative px-7 py-6 bg-purple-600 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <img
                  className=" bg-white p-2 shadow-5xld w-16 h-16 my-auto"
                  src={leaveImg}
                  alt="a"
                />
                <div className="flex flex-col gap-2 text-left">
                  <div className="flex flex-col ">
                    <p className="text-white pb-1 text-md font-regular">
                      Leaves requests need approval
                    </p>
                    <p className="text-white pb-1 text-3xl font-semibold">
                      10 Requests
                    </p>
                  </div>

                  <a
                    href="#"
                    className=" shadow-2xl rounded-md font-bold bg-white py-2 px-4 text-center"
                  >
                    Check Now
                  </a>
                </div>
              </div>
            </div>{" "}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gray-400 blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative px-7 py-6 bg-red-600 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <img
                  className=" bg-white p-2 shadow-5xl rounded-full  w-16 h-16 my-auto"
                  src={overtimeImg}
                  alt="a"
                />
                <div className="flex flex-col gap-2 text-left">
                  <div className="flex flex-col ">
                    <p className="text-white pb-1 text-md font-regular">
                      Overtime requests need approval
                    </p>
                    <p className="text-white pb-1 text-3xl font-semibold">
                      12 Requests
                    </p>
                  </div>

                  <a
                    href="#"
                    className=" shadow-2xl rounded-md font-bold bg-white py-2 px-4 text-center"
                  >
                    Check Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="p-4  bg-white rounded-md h-svh shadow-2xl ">
          <h1>chart</h1>
          <ChartBar />
        </div>
      </article>
    </>
  );
}
