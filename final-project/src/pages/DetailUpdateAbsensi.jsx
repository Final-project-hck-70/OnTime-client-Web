import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function DetailUpdateAbsensi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendances, setAttendances] = useState([]);
  const [status, setStatus] = useState("");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        });
        console.log(response);
        setAttendances(response.data[0]);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch attendance data");
        setLoading(false);
      }
    };

    fetchAttendances();
  }, []);

  const updateAttendanceStatus = async (status) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/attendances/update/${id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(response, "<<<<<<");
      console.log(status, "<<<<<<");
      navigate("/histories");
    } catch (error) {
      setError("Failed to update attendance status");
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAttendanceStatus(status);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="p-6">
        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
          Change status for {attendances.attendanceStatus}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-2 flex-col">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Status
            </label>
            <div className="gap-2 flex">
              <div className="flex items-center mb-4 ">
                <input
                  id="onTime"
                  type="radio"
                  value="On time"
                  name="status"
                  defaultChecked={attendances.attendanceStatus === "On time"}
                  onChange={handleStatusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="onTime"
                  className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                >
                  On time
                </label>
              </div>

              <div className="flex items-center mb-4 ">
                <input
                  id="absent"
                  type="radio"
                  value="Absent"
                  name="status"
                  defaultChecked={attendances.attendanceStatus === "Absent"}
                  onChange={handleStatusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="absent"
                  className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                >
                  Absent
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="late"
                  type="radio"
                  value="Late"
                  name="status"
                  defaultChecked={attendances.attendanceStatus === "Late"}
                  onChange={handleStatusChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="late"
                  className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                >
                  Late
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <Link to="/histories">
              <button
                type="submit"
                className="w-full  text-white border bg-blue-500 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
              <button
                type="button"
                className="mt-4 w-full text-blue-500 border border-blue-500 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
