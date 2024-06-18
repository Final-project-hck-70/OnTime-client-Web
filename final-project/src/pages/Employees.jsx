import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const companyOptions = [{ id: 1, name: "Tech Innovators Inc." }];
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchEmployees();
  }, []);

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

        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch employee data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedEmployee(null);
    setIsDeleteModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    try {
      const token = Cookies.get("token");
      await axios.delete(`http://localhost:3000/users/${selectedEmployee.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
      closeDeleteModal();
    } catch (error) {
      setError("Failed to delete employee");
    }
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
      setEmployees([...employees, response.data]);
      navigate("/employees");
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
            <div className="w-80 hidden lg:flex">
              <div className="relative mx-auto text-gray-600">
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-80"
                  type="search"
                  name="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {employees.map((employee, index) => (
                    <tr key={employee.id}>
                      <th>{index + 1}</th>
                      <td>
                        <img
                          className="rounded-full w-14 h-14 m-auto"
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
                          <svg
                            onClick={() => openDeleteModal(employee)}
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

      {isDeleteModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center h-full w-full"
          >
            <div className="relative p-4 w-full max-w-md h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeDeleteModal}
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
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete {selectedEmployee?.name}?
                  </h3>
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeDeleteModal}
                    type="button"
                    className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isAddModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div
            id="add-employee-modal"
            tabIndex="-1"
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center h-full w-full"
          >
            <div className="relative p-4 w-full max-w-md h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
                        name="company"
                        id="company"
                        value={newEmployee.company}
                        onChange={handleAddEmployeeChange}
                        className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select a company</option>
                        {companyOptions.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
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
