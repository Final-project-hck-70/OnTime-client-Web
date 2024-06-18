import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function EmployeeDetail() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch employee data");
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

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
          Employee detail
        </h3>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={employee.name}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={employee.email}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={employee.phoneNumber}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="avaUrl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Image URL
            </label>
            <input
              type="text"
              name="avaUrl"
              id="avaUrl"
              value={employee.avaUrl}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="CompanyId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Company
            </label>
            <select
              name="CompanyId"
              id="CompanyId"
              value={employee.CompanyId}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled
            >
              <option value="">Select a company</option>
              <option value="1">Tech Innovators Inc.</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              value={employee.position}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              disabled
            />
          </div>
          <div className="flex justify-end">
            <Link to="/employees">
              <button
                type="button"
                onClick={() => history.goBack()}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
