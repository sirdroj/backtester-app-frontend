import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pending_signups from "./PendingApprovals";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the localStorage
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("username");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-400">
            <Link to="ActiveUsers">Active Users</Link>
            </li>
          <li className="cursor-pointer hover:text-gray-400">            
            <Link to="PendingSignups">Pending Approvals</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-400 " >
            
            Settings</li>
          <li
            className="cursor-pointer hover:text-gray-400"
            onClick={handleLogout}
          >
            Log Out
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <Outlet />
      {/* <Pending_signups /> */}
    </div>
  );
};

export default AdminPanel;
