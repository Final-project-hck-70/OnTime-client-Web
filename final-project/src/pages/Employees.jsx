import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    image: "",
    company: "",
    position: "",
  });

  const navigate = useNavigate();
  const fetchEmployees = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: searchTerm,
        },
      });

      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch employee data");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [searchTerm]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setError("No token found, please log in.");
          setLoading(false);
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

        const profileData = response.data;
        setProfile(profileData);
        setNewEmployee((prevState) => ({
          ...prevState,
          company: profileData.CompanyId,
        }));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch profile data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddEmployeeChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEmployeeSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:3000/add-user",
        { ...newEmployee, company: undefined, CompanyId: newEmployee.company },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setEmployees([...employees, response.data]);

      navigate("/employees");
      closeAddModal();
      fetchEmployees();
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
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
        <header className="bg-white rounded-md shadow-2xl mb-6 p-2">
          <section>
            <h1 className="text-2xl font-bold">List of employees</h1>
            <p className="text-xs text-gray-700 font-md">
              Dashboard &gt; Report &gt; Employees
            </p>
          </section>
        </header>
        <main className="bg-white shadow-xl rounded-md p-4">
          <div className="flex justify-between mb-6">
            <div>
              <button
                className="bg-blue-500 rounded-md text-white font-semibold shadow-2xl cursor-pointer hover:bg-blue-800 p-2"
                onClick={openAddModal}
              >
                Add Employee
              </button>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <th>{index + 1}</th>
                      <td>
                        <img
                          className="rounded-md w-20 h-20 m-auto"
                          src={
                            employee.avaUrl || "https://via.placeholder.com/150"
                          }
                          alt={employee.name}
                        />
                      </td>
                      <td>{employee.name}</td>
                      <td>{employee.Company.name}</td>
                      <td>{employee.position}</td>
                      <td className="m-auto">
                        <div className="flex gap-2 justify-center">
                          <Link to={`/employees/${employee.id}`}>
                            <svg
                              className="w-4 h-4 text-blue-600 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/1999/xlink"
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
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </main>

      {isAddModalOpen && profile && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            id="add-employee-modal"
            tabIndex="-1"
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center h-full w-full"
          >
            <div className="relative p-4 w-full max-w-md h-auto">
              <div className="relative mt-20 bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeAddModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6">
                  <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                    Add New Employee
                  </h3>
                  <form onSubmit={handleAddEmployeeSubmit}>
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
                        value={newEmployee.name}
                        onChange={handleAddEmployeeChange}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
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
                        value={newEmployee.email}
                        onChange={handleAddEmployeeChange}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={newEmployee.password}
                        onChange={handleAddEmployeeChange}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
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
                        value={newEmployee.phoneNumber}
                        onChange={handleAddEmployeeChange}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        id="image"
                        value={newEmployee.image}
                        onChange={handleAddEmployeeChange}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Company
                      </label>
                      <select
                        disabled
                        name="company"
                        id="company"
                        value={profile.CompanyId}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      >
                        <option selected value={profile.CompanyId}>
                          {profile.Company.name}
                        </option>
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
                        value={newEmployee.position}
                        onChange={handleAddEmployeeChange}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={closeAddModal}
                        className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Employee
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
