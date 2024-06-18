import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import leaveImg from "../assets/travel.png";
import overtimeImg from "../assets/working-hours.png";
import Chart from "chart.js/auto";
import ChartBar from "../components/ChartBar";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [pendingOvertimeCount, setPendingOvertimeCount] = useState(0);
  const [error, setError] = useState(null);
  const [pendingLeavesCount, setLeavesCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("No token found, please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/users/profile/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        const profileData = response.data;
        setProfile(profileData);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch profile data");
      }
    };

    const fetchOvertimeRequests = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("No token found, please log in.");
          return;
        }

        const response = await axios.get("http://localhost:3000/overtimes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const overtimeRequests = response.data;
        const pendingCount = overtimeRequests.filter(
          (request) => request.overtimeStatus === "Pending"
        ).length;
        console.log(overtimeRequests, "<<<request");
        setPendingOvertimeCount(pendingCount);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch overtime requests");
      }
    };
    const fetchLeaveRequests = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("No token found, please log in.");
          return;
        }

        const response = await axios.get("http://localhost:3000/leaves", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const leavesRequests = response.data;
        const pendingCount = leavesRequests.filter(
          (request) => request.leaveStatus === "Pending"
        ).length;

        setLeavesCount(pendingCount);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch leave requests");
      }
    };

    fetchProfile();
    fetchOvertimeRequests();
    fetchLeaveRequests();
  }, []);

  return (
    <>
      <div className="p-4 bg-white m-4 rounded-md shadow-2xl flex gap-4">
        {profile && (
          <>
            <img className="rounded-md w-40 h-40" src={profile.avaUrl} alt="" />
            <div className="m-4">
              <h1 className="font-bold text-xl">{profile.name}</h1>
              <div className="mt-4">
                <h1 className="font-semibold text-md">{profile.position}</h1>
                <h1>{profile.email}</h1>
              </div>
            </div>
          </>
        )}
      </div>
      <article className="bg-white shadow-2xl p-4 m-4 rounded-md">
        <section className="flex items-center justify-around text-center p-4">
          <div className="grid grid-cols-2 w-screen gap-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gray-400 blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative px-7 py-6 bg-purple-600 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <img
                  className="bg-white p-2 shadow-5xl rounded-full w-16 h-16 my-auto"
                  src={leaveImg}
                  alt="a"
                />
                <div className="flex flex-col gap-2 text-left">
                  <div className="flex flex-col">
                    <p className="text-white pb-1 text-md font-regular">
                      Leaves requests need approval
                    </p>
                    <p className="text-white pb-1 text-3xl font-semibold">
                      {pendingLeavesCount} Requests
                    </p>
                  </div>
                  <Link
                    to="/report/leaves"
                    className="shadow-2xl rounded-md font-bold bg-white py-2 px-4 text-center"
                  >
                    Check Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gray-400 blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative px-7 py-6 bg-red-600 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <img
                  className="bg-white p-2 shadow-5xl rounded-full w-16 h-16 my-auto"
                  src={overtimeImg}
                  alt="a"
                />
                <div className="flex flex-col gap-2 text-left">
                  <div className="flex flex-col">
                    <p className="text-white pb-1 text-md font-regular">
                      Overtime requests need approval
                    </p>
                    <p className="text-white pb-1 text-3xl font-semibold">
                      {pendingOvertimeCount} Requests
                    </p>
                  </div>
                  <Link
                    to="/report/overtimes"
                    id="overtime"
                    className="shadow-2xl rounded-md font-bold bg-white py-2 px-4 text-center"
                  >
                    Check Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
