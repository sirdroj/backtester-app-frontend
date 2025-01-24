import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsDropdown from "./SettingsDropdown";
import useStore from "../stores/useStore";

export const NavbarTop = () => {
  const [selected, setSelected] = useState(1);
  const location = useLocation();
  const { username } = useStore();
  const navItems = [
    { path: "/", label: "Home", id: 1 },
    { path: "/backtest", label: "BackTest", id: 2 },
    { path: "/backtest-guide", label: "BackTest Guide", id: 5 },
    { path: "/explorer", label: "Explorer", id: 4 },
    { path: "/Chat_AI", label: "Chat with AI", id: 6 },
  ];

  function getinitials(name) {
    var initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  }

  useEffect(() => {
    const pathSegment = location.pathname.split("/")[1]; // Get the first path segment
    const found = navItems.find((item) => item.path === `/${pathSegment}`); // Compare against the path
    setSelected(found ? found.id : 1); // Set the id if found, or default to 1
  }, [location.pathname]);

  return (
<div className="w-[100%] fixed z-[1000]  h-max pb-2 pr-3 bg-opacity-[5%] bg-gray-900 backdrop-blur-[3px] bg-gradient-to-b from-gray-800 via-gray-700  to-transparent ">
<header className="w-full flex justify-center items-center mt-2">
        <Link to="/" className="px-2 flex items-center"> 
          <img src="./mtlogo2.png" className="h-8" /> <span className="text-[1.5rem] font-mono px-2">Sentient</span>
        </Link>
        <ul className="ml-36 z-100 flex justify-between p-2 px-5 border-solid border-[1px] w-3/5 bg-black bg-opacity-[10%] border-[#5E445F] rounded-full text-[12px]">
          {navItems.map((item) => (
            <Link to={item.path} key={item.id} className="text-white z-50 ">
              <li
                className={`${
                  selected === item.id
                    ? "bg-black bg-opacity-5 border-[#5E445F] border-[0.5px]"
                    : ""
                } z-10 rounded-full px-4 justify-center align-middle flex cursor-pointer`}
                style={
                  selected === item.id
                    ? {
                        boxShadow: " 0 0 2px 2px rgba(255, 255, 255, 0.7)",
                      }
                    : {}
                }
              >
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex justify-end items-center w-1/5 ">
          <div className="flex justify-around items-center w-min px-1 border-[1px] border-opacity-[10%] rounded-full space-x-1 p-[2px]">
            <SettingsDropdown />
            {/* <div className="text-xl">{getinitials(username)}</div> */}
            <div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-opacity-30 dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300 dark:bg-opacity-30">
                {getinitials(username)}
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
