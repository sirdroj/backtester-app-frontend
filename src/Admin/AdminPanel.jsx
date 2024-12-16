import React from "react";
import Pending_signups from "./Pending_signups";

const AdminPanel = () => {

  // Fetch pending signups

  // Approve a signup

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-400">Dashboard</li>
          <li className="cursor-pointer hover:text-gray-400">Pending Signups</li>
          <li className="cursor-pointer hover:text-gray-400">Settings</li>
          <li className="cursor-pointer hover:text-gray-400">Log Out</li>
        </ul>
      </div>

      {/* Main Content */}
      <Pending_signups />
    </div>
  );
};

export default AdminPanel;
