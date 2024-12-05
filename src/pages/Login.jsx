import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../stores/useStore";

const Login = () => {
  const navigate = useNavigate();
  const [usernameLocal, setusernameLocal] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const {setusername,settoken } = useStore();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error messages
  
    // Use FormData to send data as application/x-www-form-urlencoded
    const formData = new FormData();
    formData.append("username", usernameLocal);
    formData.append("password", password);
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      // Store the access token in localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("User Name", response.data.username);
      setusername(response.data.username)
      settoken( response.data.access_token)
  
      // Redirect to the dashboard
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-[#3E2539] to-[#101F29] dark:bg-gradient-to-r dark:from-[#121124] dark:to-[#0b191e] flex items-center justify-center px-2">
      <div className="absolute top-0 left-0 items-center text-white flex text-[25px] p-2"><img className="w-[40px] mx-3" src="./mtLogo.png"/> Santient</div>
      <div className="w-[500px] flex justify-center items-center pt-0 bg-black bg-opacity-5 rounded-lg">
        <div className="container w-[500px] p-10 border-[1px] rounded-md shadow-md bg-bggrey">
          <h2 className="w-full text-center font-bold text-2xl text-gray-400">LOGIN</h2>
          <form onSubmit={handleSubmit} className="block p-5">
            <label className="block text-sm mb-2 text-gray-200" htmlFor="username">
              Username
            </label>
            <input
              className="my-3 appearance-none w-full m-[4px] border-[2px] p-3 rounded-sm focus:outline-none focus:border-bordercolor1"
              type="text"
              placeholder="Username"
              value={usernameLocal}
              onChange={(e) => setusernameLocal(e.target.value)}
              required
              name="username"
            />

            <label className="block text-sm mb-2 text-gray-200" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-0 right-0 flex items-center px-3 cursor-pointer text-gray-400 rounded-e-md"
              >
                {showPassword ? (
                  <svg
                    className="shrink-0 size-3.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    className="shrink-0 size-3.5"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                )}
              </button>
            </div>

            {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}

            <input
              type="submit"
              value="Login"
              className="cursor-pointer p-2 font-bold bg-gradient-to-r from-bordercolor1 to-bordercolor2 text-white rounded-md px-4 mt-7 w-full"
            />
          </form>
          {/* <div className="w-full text-center">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
