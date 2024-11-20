import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL;
const Login = ({setIsAdmin}) => {
    const [username,setusername] = useState("");
    const [password,setPassword] = useState("");
    const [ErrorMsg,setErrorMsg] = useState(false);
    const navigate = useNavigate();
useEffect(()=>{
    if(localStorage.getItem("admin")){
        navigate("/admin/dashboard");
    }
},[])
   
    
    const handleLogin = (e) => {
        e.preventDefault();
            axios.post(`${apiUrl}/admin`,{username,password}).then((res)=>{
                if(res.data == true){
                    localStorage.setItem("admin",true);
                    setIsAdmin(true);
                    navigate("/admin/dashboard");
                }else{
                    alert("Invalid credentials");
                    navigate("/admin");
                }
            }).catch((err)=>{
                setErrorMsg(true);
                console.log(err)
            })
      };
  return (
    <>
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={handleLogin} method='post'>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputusername" onChange={(e)=>setusername(e.target.value)} type="text" name='username' placeholder="username" />
                                                <label htmlFor="inputusername" className='text-dark'>Username</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputPassword" type="password" name='password' onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                                                <label htmlFor="inputPassword" className='text-dark'>Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button className="btn btn-primary w-25 m-auto" type="submit">Login</button>
                                            </div>
                                        </form>
                                        <div className="">{ErrorMsg? "Invalid credential" : ""}</div>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/admin/passwordreset">Forgot password ?</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Rajesh Portfolio 2024</div>
                            <div>
                                <a href="">Privacy Policy</a>
                                &middot;
                                <a href="">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </>
  )
}

export default Login