import React from "react";

const Login2 = () => {
  return (
    <div>
      <div>
        <h1>Santient Login</h1>
        <form className="grid-cols-1">
          <div>
            <label>User ID</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login2;
