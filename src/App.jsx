import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";
import { NavbarTop } from "./components/NavbarTop";
import useStore from "./stores/useStore";
import ChatBot from "./pages/ChatBot";

function App() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme,username,token } = useStore();
  const location = useLocation(); // Get the current route
  


  function checkLogin() {

    if ( (!localStorage.getItem("access_token") || !localStorage.getItem("username"))) {
      window.location.href = "/login"; 
    }
  }

  checkLogin();

  return (
    <div
      className={` ${theme} `}
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`w-screen min-h-screen bg-gradient-to-r from-[#3E2539] to-[#101F29] dark:bg-gradient-to-r dark:from-[#121124] dark:to-[#0b191e] overflow-hidden text-white bg-opacity-20`}
      >
        <NavbarTop />

        {/* Conditionally render ChatBot if the current path is not '/chat_ai' */}
        {location.pathname !== "/Chat_AI" && <ChatBot />}

        <div className="mt-10 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
