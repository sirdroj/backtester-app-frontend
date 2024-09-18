import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, Link } from 'react-router-dom';
import Home from "./pages/Home";
import { NavbarTop } from "./components/NavbarTop";

function App() {
  const [count, setCount] = useState(0);

  return (
 
  <div className="w-screen h-[800px]  bg-gradient-to-r from-[#3E2539] to-[#101F29]  overflow-hidden text-white">
    <NavbarTop />
    <div className="mt-10 overflow-hidden">

    <Outlet />
    </div>
  </div>
  );
}

export default App;
