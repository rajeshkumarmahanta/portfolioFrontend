import React, { useEffect, useState } from "react";
import Sidemenu from "./components/Sidemenu";
import Footer from "./components/Footer";
import AdminNav from "./components/AdminNav";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminPortfolio = () => {
  const [projectTitle,setProjectTitle]=useState("");
  const [projectDesc,setProjectDesc]=useState("");
  const [projectUrl,setProjectUrl]=useState("");
  const [projectTech,setProjectTech]=useState("");
  const [updateId,setUpdateId]=useState("");
  const [change, setChange] = useState(false);
  const [projects,setProjects]=useState([]);
  const handleProject = (e)=>{
    e.preventDefault();
    if(projectTitle =="" && projectDesc == "" && projectUrl=="" && projectTech ==""){
      toast.error("Please fill the project details !");
      return;
    }
  
    axios.post(`${apiUrl}/project`,{projectTitle,projectDesc,projectUrl,projectTech}).then((res)=>{
      if (res.data == "projectAlreadyExist") {
        toast.info("project Already Exist !");
        return;
      }
      if (res.data) {
        toast.success("Project Added !");
        setChange(!change)
      } else {
        toast.error("error !");
      }
    }).catch((err)=>{
      console.log(err)
    })
      setProjectTitle("");
      setProjectDesc("");
      setProjectUrl(""); 
      setProjectTech("");
  }

  const handleProjectUpdate = (e)=>{
    e.preventDefault();
    axios.put(`${apiUrl}/projectupdate/${updateId}`,{projectTitle,projectDesc,projectUrl,projectTech}).then((res)=>{
      if (res.data.acknowledged) {
        toast.success("Updated Success !");
        setChange(!change)
      } else {
        toast.error("Error !");
      }
    
    }).catch((err)=>{
      console.log(err);
    })
  }
  const fetchSingleProject = (id)=>{
    axios.get(`${apiUrl}/singleproject/${id}`).then((res)=>{
      setProjectTitle(res.data.title);
      setProjectDesc(res.data.description);
      setProjectUrl(res.data.url); 
      setProjectTech(res.data.technology);
      setUpdateId(res.data._id);
      setChange(!change)
    }).catch((err)=>{
      console.log(err);
    })
  }
  const handleDelete = (id)=>{
    axios
    .delete(`${apiUrl}/projectdelete/${id}`)
    .then((res) => {
      if (res.data.deletedProject) {
        toast.error("Project Deleted !");
        setChange(!change)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(()=>{
    axios.get(`${apiUrl}/project`).then((res)=>{
      setProjects(res.data);
    }).catch((err)=>{
      console.log(err)
    })
  },[change])
  return (
    <>
      <AdminNav />
      <div id="layoutSidenav">
        <Sidemenu />
        <div id="layoutSidenav_content">
          <main>
            <div className="container text-light">
              <h1 className="py-3">Portfolio</h1>
              <div className="container">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#projectModal">
                  Add Project
                </button>
                <div className="d-flex flex-wrap">
                {
                  projects.length > 0 ? projects.map((item,i)=>{
                    return <div className="card m-2" key={i} style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-dark">
                      {item.description.slice(0,140)}
                      </p>
                      <p className="text-dark">{item.url}</p>
                      <p className="text-dark">{item.technology.map((item,i)=>{
                        return <span key={i}>{item},</span>
                      })}</p>
                      <div className="d-flex">
                        <button
                          className="btn btn-primary me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#projectModalupdate" onClick={()=>fetchSingleProject(item._id)}>
                          Update
                        </button>
                        <button className="btn btn-danger me-2" onClick={()=>handleDelete(item._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                  }) : <h2>No Project added yet!</h2>
                }
                  
                </div>
                {/* Modal Form */}
                <div className="modal fade" id="projectModal" tabindex="-1">
                  <form action="" onSubmit={handleProject}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-dark h5"
                            id="exampleModalLabel">
                            Add Project
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label
                              htmlFor="projectTitle"
                              className="form-label text-dark h5">
                              Project Title
                            </label>
                            <input value={projectTitle} onChange={(e)=>setProjectTitle(e.target.value)}
                              type="text"
                              className="form-control text-dark"
                              id="projectTitle"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="projectTech"
                              className="form-label text-dark h5">
                              Project Technologies used (separate by comma)
                            </label>
                            <input
                              type="text" value={projectTech} onChange={(e)=>setProjectTech(e.target.value)}
                              className="form-control text-dark"
                              id="projectTech"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="projectLink "
                              className="form-label text-dark h5">
                              Project Link
                            </label>
                            <input
                              type="text"
                              className="form-control text-dark" 
                              id="projectLink" value={projectUrl} onChange={(e)=>setProjectUrl(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="projectDesc"
                              className="form-label text-dark h5">
                              Project Description
                            </label>
                            <textarea
                              className="form-control text-dark" value={projectDesc}
                              id="projectDesc" onChange={(e)=>setProjectDesc(e.target.value)}
                              rows="3"/> 
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* project modal update */}
                <div
                  className="modal fade"
                  id="projectModalupdate"
                  tabindex="-1">
                  <form action="" onSubmit={handleProjectUpdate}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title text-dark h5">
                            Update Project
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3">
                            <label
                              htmlFor="projectTitle "
                              className="form-label text-dark h5">
                              Project Title
                            </label>
                            <input
                              type="text"
                              value={projectTitle} onChange={(e)=>setProjectTitle(e.target.value)}
                              className="form-control text-dark"
                              id="projectTitle"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="projectTech "
                              className="form-label text-dark h5">
                              Project Technologies used (separate by comma)
                            </label>
                            <input
                              type="text" value={projectTech} onChange={(e)=>setProjectTech(e.target.value)}
                              className="form-control text-dark"
                              id="projectTech"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="projectLink "
                              className="form-label text-dark h5">
                              Project Link
                            </label>
                            <input
                              type="text" value={projectUrl} onChange={(e)=>setProjectUrl(e.target.value)}
                              className="form-control text-dark"
                              id="projectLink"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="projectDesc"
                              className="form-label text-dark h5">
                              Project Description
                            </label>
                            <textarea
                              className="form-control text-dark" value={projectDesc}
                              id="projectDesc" onChange={(e)=>setProjectDesc(e.target.value)}
                              rows="3"/>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminPortfolio;
