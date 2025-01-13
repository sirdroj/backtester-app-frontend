import React from "react";
import useStore from "../../stores/useStore";
import { Link, Outlet } from "react-router-dom";

const News = () => {
  return (
    <div
      className={` w-screen min-h-screen bg-gradient-to-r from-[#3E2539] to-[#101F29] dark:bg-gradient-to-r dark:from-[#121124] dark:to-[#0b191e] overflow-hidden text-white bg-opacity-20`}
    >
      <Link to={"/"} className="text-[25px] font-bold w-screen bg-white bg-opacity-10 x-4 mt-2 px-4">Sentient</Link>
      <h1 className="text-[20px] font-semibold px-4"> News</h1>
      <Outlet />
    </div>
  );
};

export default News;
