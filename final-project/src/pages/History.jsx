import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function History() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("No token found, please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/attendances", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            day,
            month,
            year,
            sort: "desc",
          },
        });
        console.log(response);
        setAttendances(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch attendance data");
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [day, month, year]);

  const handleDayChange = (event) => {
    setDay(event.target.value);
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
      <main className="h-full items-center justify-center p-4">
        <header className="bg-white rounded-md shadow-2xl mb-6 p-2">
          <section>
            <h1 className="text-2xl font-bold">Attendance Report</h1>
            <p className="text-xs text-gray-700 font-md">
              Dashboard &gt; Report &gt; Attendance
            </p>
          </section>
        </header>
        <main className="bg-white shadow-xl rounded-md p-4">
          <div className="flex justify-end mb-6">
            <div className="flex gap-4">
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                type="number"
                name="day"
                placeholder="Day"
                value={day}
                onChange={handleDayChange}
                min="1"
                max="31"
              />
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

                    <th>Clock In</th>
                    <th>Clock Out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendances.map((attendance, index) => (
                    <tr key={attendance.id}>
                      <th>{index + 1}</th>
                      <td>{attendance.User.name}</td>

                      <td>{new Date(attendance.clockIn).toLocaleString()}</td>
                      <td>
                        {attendance.clockOut
                          ? new Date(attendance.clockOut).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>{attendance.attendanceStatus}</td>
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
