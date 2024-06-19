import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import rejectButton from "../assets/x.png";

export default function OvertimeReport() {
  const [overtimes, setOvertimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const fetchOvertimes = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3000/overtimes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          month,
          year,
        },
      });

      setOvertimes(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch overtime data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOvertimes();
  }, [month, year]);

  const updateOvertimeStatus = async (id, status) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.patch(
        `http://localhost:3000/overtimes/${id}`,
        { overtimeStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOvertimes();
    } catch (error) {
      console.log(error);
      setError("Failed to update overtime status");
    }
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <main className="h-full items-center justify-center p-4 h-screen">
        <header className="bg-white rounded-md shadow-xl mb-6 p-2">
          <section>
            <h1 className="text-2xl font-bold">Overtime Report</h1>
            <p className="text-xs text-gray-700 font-md">
              Dashboard &gt; Report &gt; Overtime
            </p>
          </section>
        </header>
        <main className="bg-white shadow-xl rounded-md p-4">
          <div className="flex justify-end mb-6">
            <div className="flex gap-4">
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                type="number"
                name="month"
                placeholder="Month"
                value={month}
                onChange={handleMonthChange}
                min="1"
                max="12"
              />
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                type="number"
                name="year"
                placeholder="Year"
                value={year}
                onChange={handleYearChange}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
          <div className="my-6">
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Overtime Date</th>
                    <th>Overtime Duration</th>
                    <th>Reason</th>
                    <th>Delegate user</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {overtimes.map((overtime, index) => (
                    <tr key={overtime.id}>
                      <th>{index + 1}</th>
                      <td>{overtime.User.name}</td>
                      <td>
                        {new Date(overtime.overtimeDate).toLocaleDateString()}
                      </td>
                      <td>{overtime.overtimeDuration} hours</td>
                      <td>{overtime.overtimeReason}</td>
                      <td>{overtime.User.name}</td>
                      <td>{overtime.overtimeStatus}</td>
                      <td>
                        {overtime.overtimeStatus === "Pending" ||
                        overtime.overtimeStatus === null ? (
                          <div className="flex gap-2 justify-center">
                            <div
                              className="bg-green-500 rounded-md shadow-2xl p-1 cursor-pointer"
                              onClick={() =>
                                updateOvertimeStatus(overtime.id, "Accepted")
                              }
                            >
                              <svg
                                className="w-4 h-4 fill-white"
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
                              className="bg-red-500 rounded-md shadow-2xl p-1 cursor-pointer"
                              onClick={() =>
                                updateOvertimeStatus(overtime.id, "Rejected")
                              }
                            >
                              <img
                                className="w-4 h-4"
                                src={rejectButton}
                                alt="Reject"
                              />
                            </div>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </main>
    </>
  );
}
