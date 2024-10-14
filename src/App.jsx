import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import { NavbarTop } from "./components/NavbarTop";
import useStore from "./stores/useStore";
import ChatBot from "./pages/ChatBot";

function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useStore();

  return (
    <div className={` ${theme} `}>
      <div
        className={`  w-screen  min-h-screen  bg-gradient-to-r from-[#3E2539] to-[#101F29] dark:bg-gradient-to-r dark:from-[#121124] dark:to-[#0b191e] overflow-hidden text-white`}
      >
        <NavbarTop />
        <ChatBot />
        <div className="mt-10 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
