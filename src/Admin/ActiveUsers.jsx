import axios from "axios";
import React, { useEffect, useState } from "react";
import currentAPI from "../apiendpoint";

const ActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  // Fetch active users
  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const token = localStorage.getItem("admin_access_token"); // Assuming the token is stored in localStorage
        const response = await axios.get(`${currentAPI}/admin/get_active_users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setActiveUsers(response.data.active_users);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchActiveUsers();
  }, []);

  // Delete a user
  const handleDelete = async ( email) => {
    try {
      const token = localStorage.getItem("admin_access_token");
      await axios.delete(`${currentAPI}/admin/delete_user`, {
        data: {  email }, // Send user data in the request body
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("User deleted successfully!");
      setActiveUsers(
        activeUsers.filter((user) => user.email !== email)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.", error);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Active Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user) => (
              <tr key={user.email} className="border-t">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete( user.email)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveUsers;
