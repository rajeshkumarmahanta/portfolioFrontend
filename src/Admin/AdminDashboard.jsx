import React, { useState,useEffect } from 'react'
import Sidemenu from './components/Sidemenu'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import  AdminNav from './components/AdminNav'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
const AdminDashboard = () => {
  const[blog,setBlog] = useState(0);
  const[project,setProject] = useState(0);
  const[service,setService] = useState(0);
  const[message,setMessage] = useState(0);
  useEffect(() => {
    axios.get(`${apiUrl}/blog`).then((res) => {
      // console.log(res.data);
      setBlog(res.data.length);
    }).catch((err) => {
      console.log(err)
    });
    axios.get(`${apiUrl}/service`).then((res)=>{
      setService(res.data.length)
    }).catch((err)=>{
      console.log(err);
    });
    axios.get(`${apiUrl}/project`).then((res)=>{
      setProject(res.data.length);
    }).catch((err)=>{
      console.log(err)
    });
    axios.get(`${apiUrl}/message`).then((res)=>{
      setMessage(res.data.length)
    }).catch((err)=>{
      console.log(err);
    })
  }, []);
  return (
    <>
    <AdminNav/>
        <div id="layoutSidenav">
            <Sidemenu/>
            <div id="layoutSidenav_content">
                <main>
                <Dashboard blog={blog} project={project} service={service} message={message}  />
                </main>
                <Footer/>
                </div>
        </div>
        </>
  )
}

export default AdminDashboard