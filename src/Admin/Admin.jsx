import React, { useState } from "react";
import axios from "axios";
const Admin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}/create`,{userName,password}).then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container text-light pt-5">
        <h1 className="text-center">Create Admin</h1>

        <div className="w-25 m-auto">
          <form action="" onSubmit={handleForm} method="post">
            <div className="mb-3">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                Username
              </label>
              <input type="text" onChange={(e)=>setUserName(e.target.value)} name="username" className="form-control" id="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="form-control" id="password" />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
