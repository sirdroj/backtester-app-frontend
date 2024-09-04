import React, { useState } from "react";
import { Link } from "react-router-dom";

export const NavbarTop = () => {
  const [selected, setSelected] = useState(1);

  return (
    <div className="h-5">
      <header className="w-full flex justify-center ">
        <ul className=" z-100 flex justify-between p-1 px-5 border-solid border-[1px] w-3/5 bg-black bg-opacity-[10%] border-[#5E445F]  rounded-full mt-5 text-[12px]">
          <li
            className={`${
              selected == 1
                ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px] "
                : ""
            } z-10  rounded-full px-4 justify-center align-middle flex cursor-pointer transition-all duration-300 ease-in-out`}
            onClick={() => setSelected(1)}
          >
            <Link to={"/"} className="text-white">
              Home
            </Link>
          </li>
          <li
            className={`${
              selected == 2
                ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px]"
                : ""
            }   rounded-full px-4 justify-center align-middle flex cursor-pointer`}
            onClick={() => setSelected(2)}
          >
            <Link to={"/backtest"} className="text-white">
              BackTest
            </Link>
          </li>
          <li
            className={`${
              selected == 5
                ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px]"
                : ""
            }   rounded-full px-4 justify-center align-middle flex cursor-pointer`}
            onClick={() => setSelected(5)}
          >
            <Link to={"/backtest-guide"} className="text-white">
              BackTest guide
            </Link>
          </li>
          <li
            className={`${
              selected == 5
                ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px]"
                : ""
            }   rounded-full px-4 justify-center align-middle flex cursor-pointer`}
            onClick={() => setSelected(5)}
          >
            <Link to={"/backtest-guide-beta"} className="text-white">
              BackTest guide b
            </Link>
          </li>
          <li
            className={`${
              selected == 3
                ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px]"
                : ""
            }   rounded-full px-4 justify-center align-middle flex cursor-pointer`}
            onClick={() => setSelected(3)}
          >
            Charts
          </li>
          <li
            className={`${
              selected == 4
                ? "bg-black bg-opacity-5 border-[#5E445F] border-[0.5px]"
                : ""
            } rounded-full px-4 justify-center align-middle flex cursor-pointer transition-all duration-300 ease-in-out`}
            onClick={() => setSelected(4)}
          >
            Explore
          </li>
        </ul>
      </header>
    </div>
  );
};
