import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <main className="  h-screen  items-center justify-center bg-red-200 md:w-5/6   ">
        <section className="bg-blue-200 flex items-center justify-around  text-center p-4">
          <div className="grid grid-cols-2 w-screen gap-2">
            <div className="bg-gray-200  h-32 rounded-md ">
              <h1>Total leave requests</h1>
            </div>
            <div className="bg-gray-200  rounded-md">
              <h1>Total overtime requests</h1>
            </div>
          </div>
        </section>

        <article className="bg-purple-300 h-screen p-4 ">
          <div className="p-4  bg-white rounded-md h-svh sh">
            <h1>graphic total leaves and overtime this month</h1>
          </div>
        </article>
      </main>
    </>
  );
}
