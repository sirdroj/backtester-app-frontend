import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const NavbarTop = () => {
  const [selected, setSelected] = useState(1);
  useEffect(() => {
    // Determine the initial selected state based on the pathname
    switch (location.pathname) {
      case "/":
        setSelected(1);
        break;
      case "/backtest":
        setSelected(2);
        break;
      case "/backtest-guide":
        setSelected(5);
        break;
      case "/charts":
        setSelected(3);
        break;
      case "/explore":
        setSelected(4);
        break;
      default:
        setSelected(1);
    }
  }, [location.pathname]);

  return (
    <div className="h-5 w-[98%] fixed z-50">
      <header className="w-full flex justify-center ">
        <ul className=" z-100 flex justify-between p-1 px-5 border-solid border-[1px] w-3/5 bg-black bg-opacity-[10%] border-[#5E445F]  rounded-full mt-5 text-[12px]">
          <Link to={"/"} className="text-white z-50">
            <li
              className={`${
                selected == 1
                  ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px] "
                  : ""
              } z-10  rounded-full px-4 justify-center align-middle flex cursor-pointer `}
              onClick={() => setSelected(1)}
            >
              Home
            </li>
          </Link>
          <Link to={"/backtest"} className="text-white z-50">
            <li
              className={`${
                selected == 2
                  ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px]"
                  : ""
              }   rounded-full px-4 justify-center align-middle flex cursor-pointer`}
              onClick={() => setSelected(2)}
            >
              BackTest
            </li>
          </Link>

          <Link to={"/backtest-guide"} className="text-white z-50">
          <li
            className={`${
              selected == 5
                ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px]"
                : ""
            }   rounded-full px-4 justify-center align-middle flex cursor-pointer`}
            onClick={() => setSelected(5)}
          >
              BackTest guide
          </li>
            </Link>
          {/* <li
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
          </li> */}
          <Link className="text-white z-50">
          <li
            className={`${
              selected == 3
                ? "bg-black bg-opacity-5   border-[#5E445F] border-[0.5px]"
                : ""
            }   rounded-full px-4 z-50 justify-center align-middle flex cursor-pointer`}
            onClick={() => setSelected(3)}
          >
            Charts
          </li>
          </Link>
          <Link className="text-white z-50">

          <li
            className={`${
              selected == 4
                ? "bg-black bg-opacity-5 border-[#5E445F] border-[0.5px]"
                : ""
            } rounded-full px-4 justify-center align-middle flex cursor-pointer `}
            onClick={() => setSelected(4)}
          >
            Explore
          </li>
          </Link>
        </ul>
      </header>
    </div>
  );
};
