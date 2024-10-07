import React from "react";

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <div className="flex px-[100px]">
        <ul className="w-56 space-y-2">
          <li className="">Theme</li>
          <li className=""></li>
          <li className="">Theme</li>
        </ul>
        <div
          id="formsection"
          className="m-2  relative h-[450px] bg-black bg-opacity-10 rounded-lg w-[1000px]"
          style={{ boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.2)" }}
        ></div>
      </div>
    </div>
  );
};

export default Settings;
