import axios from "axios";
import React, { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const Reg = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/create`,{username,password})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form onSubmit={handleLogin} method="post">
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="inputusername"
            onChange={(e) => setusername(e.target.value)}
            type="text"
            value={username}
            name="username"
            placeholder="username"
          />
          <label htmlFor="inputusername" className="text-dark">
            Username
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="inputPassword"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label htmlFor="inputPassword" className="text-dark">
            Password
          </label>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
          <button className="btn btn-primary w-25 m-auto" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Reg;
