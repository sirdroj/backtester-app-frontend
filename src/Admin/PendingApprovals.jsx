import axios from "axios";
import React, { useEffect, useState } from "react";
import currentAPI from "../apiendpoint";

const PendingApprovals = () => {
    const [pendingSignups, setPendingSignups] = useState([
        {
          user_id: "101",
          username: "john_doe",
          email: "john.doe@example.com",
        },
        {
          user_id: "102",
          username: "jane_smith",
          email: "jane.smith@example.com",
        },
        {
          user_id: "103",
          username: "alice_jones",
          email: "alice.jones@example.com",
        },
        {
          user_id: "104",
          username: "mike_brown",
          email: "mike.brown@example.com",
        },
      ]);

//   Fetch pending signups
  useEffect(() => {
    const fetchPendingSignups = async () => {
      try {
        const token = localStorage.getItem("admin_access_token"); // Assuming the token is stored in localStorage
        const response = await axios.get(
          `${currentAPI}/admin/get_pending_signup`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPendingSignups(response.data.pending_signups);
      } catch (error) {
        console.error("Error fetching pending signups:", error);
      }
    };

    fetchPendingSignups();
  }, []);

  // Approve a signup
  const handleApprove = async (username, email) => {
    try {
      const token = localStorage.getItem("admin_access_token");
      await axios.post(
        `${currentAPI}/admin/approve_signup`,
        { username, email }, // Send user data in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      alert("Signup approved successfully!");
      setPendingSignups(
        pendingSignups.filter((signup) => signup.username !== username && signup.email !== email)
      );
    } catch (error) {
      console.error("Error approving signup:", error);
      alert("Failed to approve signup.", error);
    }
  };

  
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>
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
            {pendingSignups.map((signup) => (
              <tr key={signup.email} className="border-t">
                <td className="px-4 py-2">{signup.username}</td>
                <td className="px-4 py-2">{signup.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleApprove(signup.username,signup.email)}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                  >
                    Approve
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

export default PendingApprovals;
