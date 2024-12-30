import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pending_signups from "./PendingApprovals";
import useStore from "../stores/useStore";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { adminname} = useStore();

  const handleLogout = () => {
    // Clear the localStorage
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("username");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-400">
            <Link to="ActiveUsers">Active Users</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-400">
            <Link to="PendingSignups">Pending Approvals</Link>
          </li>
          <li className="cursor-pointer hover:text-gray-400 ">Settings</li>
          <li
            className="cursor-pointer hover:text-gray-400"
            onClick={handleLogout}
          >
            Log Out
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-5/6 h-full bg-gray-100 p-2">
        <div className="flex justify-end px-4">
          {/* <div>{user}</div> */}
          <div class="flex items-center gap-4 mb-2 justify-end">
            <div class="relative w-8 h-8 overflow-hidden bg-gray-300  rounded-full dark:bg-gray-500">
              <svg
                class="absolute w-10 h-10 text-gray-700 -left-1 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>{" "}
            <div class="font-medium dark:text-white">
              <div>
                <span>{adminname}</span>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      {/* <Pending_signups /> */}
    </div>
  );
};

export default AdminPanel;
