import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Dashboard = ({project,blog,service,message}) => {
  const [userMessages,setUserMessages] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(()=>{
    axios.get(`${apiUrl}/message`).then((res)=>{
      setUserMessages(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  });
  const handleDelete = (id)=>{
    axios.delete(`${apiUrl}/message/${id}`).then((res)=>{
      if(res.data){
        toast.error("viewer's message deleted!");
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
      <div className="container-fluid px-4 text-light">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body text-center">
                <h3>Total Blogs</h3>
                <h4>{blog}</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body text-center">
                <h3>Total Projects</h3>
                <h4>{project}</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body text-center">
                <h3>Total Services</h3>
                <h4>{service}</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body text-center">
                <h3>Total Message </h3>
                <h4>{message}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Message from viewers
          </div>
          <div className="card-body">
            <table
              id="datatablesSimple"
              className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userMessages.length>0? userMessages.map((item,i)=>{
                  return <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td>
                    <a href={`mailto:${item.email}`} className="btn btn-primary me-2">replay</a>
                    <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
                }) : <tr>
                  <td>No user Message you !</td></tr>
              }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
