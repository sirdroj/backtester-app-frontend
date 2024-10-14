import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsDropdown from "./SettingsDropdown";

export const NavbarTop = () => {
  const [selected, setSelected] = useState(1);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", id: 1 },
    { path: "/backtest", label: "BackTest", id: 2 },
    { path: "/backtest-guide", label: "BackTest Guide", id: 5 },
    { path: "/explore", label: "Explore", id: 4 },
  ];

  useEffect(() => {
    const pathSegment = location.pathname.split("/")[1]; // Get the first path segment
    const found = navItems.find((item) => item.path === `/${pathSegment}`); // Compare against the path
    setSelected(found ? found.id : 1); // Set the id if found, or default to 1
  }, [location.pathname]);
  

  return (
    <div className="h-5 w-[98%] fixed z-50">
      <header className="w-full flex justify-center items-center mt-5">
        <ul className="ml-60 z-100 flex justify-between p-1 px-5 border-solid border-[1px] w-3/5 bg-black bg-opacity-[10%] border-[#5E445F] rounded-full text-[12px]">
          {navItems.map((item) => (
            <Link to={item.path} key={item.id} className="text-white z-50">
              <li
                className={`${
                  selected === item.id
                    ? "bg-black bg-opacity-5 border-[#5E445F] border-[0.5px]"
                    : ""
                } z-10 rounded-full px-4 justify-center align-middle flex cursor-pointer`}
              >
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
        <SettingsDropdown />
      </header>
    </div>
  );
};
