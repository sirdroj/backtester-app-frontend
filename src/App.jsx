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
  //   <div className="bg-blue-200 w-screen h-screen border-solid">
  //     <h className="text-blue-400">hii</h>
  //     <svg className="w-full h-full">
  //       <path
  //         class="theLine"
  //         d="M -5,0
  //         Q 450 230 300 450
  //         t 130 750
  //         Q 100 850 300 1000
  //         T 150 1200
  //         "
  //         fill="none"
  //         stroke="white"
  //         stroke-width="10px"
  //       />
  //       <svg width="100%" height="100%">
  //         <path
  //           d="
  //   M 0,100%         <!-- Move to the bottom-left corner -->
  //   Q 50%, 0% 100%,100% <!-- Draw a curve to the bottom-right corner -->
  // "
  //           fill="none"
  //           stroke="white"
  //           stroke-width="10px"
  //         />
  //       </svg>

  //       <svg width="100%" height="100%">
  //         <path
  //           d="
  //   M 0,100%        <!-- Move to the bottom-left corner -->
  //   A 50%, 50% 0 0,1 100%,100% <!-- Draw an arch to the bottom-right corner -->
  // "
  //           fill="none"
  //           stroke="white"
  //           stroke-width="10px"
  //         />
  //       </svg>

  //       <circle class="ball ball01" r="10" cx="100" cy="300" />
  //       <circle class="ball ball01" r="10" cx="300" cy="200" />
  //       <circle class="ball ball01" r="10" cx="500" cy="160" />
  //       <circle class="ball ball01" r="10" cx="700" cy="200" />
  //       <circle class="ball ball01" r="10" cx="900" cy="300" />
  //     </svg>
  //   </div>


  <div className="w-screen min-h-screen  bg-gradient-to-r from-[#3E2539] to-[#101F29]  z[-10] overflow-hidden">
    {/* <Home /> */}
    <NavbarTop />
    <div className="mt-10 overflow-hidden">

    <Outlet />
    </div>
  </div>
  );
}

export default App;
