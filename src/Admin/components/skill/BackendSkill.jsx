import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
const BackendSkill = () => {
  const [backendRangeValue, setbackendRangeValue] = useState(0);
  const [BgColorbackend, setBgColorbackend] = useState("" || "#000000");
  const [BSkillName, setBSkillName] = useState("");
  const [BSkillDesc, setBSkillDesc] = useState("");
  const [updateId, setupdateId] = useState("");
  const [backendSkills, setBackendSkills] = useState([]);
  const [change, setChange] = useState(false);
  const fetchSingleData = (id) => {
    axios.get(`http://localhost:3000/singlebackend/${id}`).then((res) => {
      setbackendRangeValue(res.data.percent);
      setBSkillName(res.data.name);
      setBSkillDesc(res.data.description);
      setBgColorbackend(res.data.bgColor);
      setupdateId(res.data._id);
      setChange(!change)
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleBackendUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/updatebackend/${updateId}`, { backendRangeValue, BgColorbackend, BSkillName, BSkillDesc }).then((res) => {
      if (res.data.acknowledged) {
        toast.success("Updated Success !");
        setChange(!change)
      } else {
        toast.error("Error !");
      }
    }).catch((err) => {
      console.log(err)
    });
    setbackendRangeValue(0);
    setBgColorbackend("" || "#000000");
    setBSkillName("");
    setBSkillDesc("");
    setupdateId("")
  }
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/backenddelete/${id}`).then((res) => {
      if(res.data.deletedBackend) {
        toast.error("Skill Deleted !");
        setChange(!change)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const handlebackendSkill = (e)=>{
    e.preventDefault();
    if(backendRangeValue==0 && BSkillName=="" && BSkillDesc=="" ){
      toast.error("Please fill the text fields !");
      return;
    }
    axios.post(`http://localhost:3000/backend`,{backendRangeValue,BgColorbackend,BSkillName,BSkillDesc}).then((res)=>{
      if (res.data == "skillAlreadyExist") {
        toast.info("Skill Already Exist !");
        return;
      }
      if (res.data) {
        toast.success("Skill Added !");
        setChange(!change)
      } else {
        toast.error("error !");
      }
    }).catch((err)=>{
      console.log(err)
    })
    setbackendRangeValue(0);
    setBgColorbackend("" || "#000000");
    setBSkillName("");
    setBSkillDesc("");
    setupdateId("")

  }
  useEffect(() => {
    axios.get(`http://localhost:3000/backend`).then((res) => {
      setBackendSkills(res.data);
    }).catch((err) => {
      console.log(err)
    })

  }, [change]);
  return (
    <>
        {/* backend */}
        <div className="container py-4">
                <h3>Backend</h3>
                {/* backend modal button */}
                <span
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#backendModal">
                  Add backend skill
                </span>
                {/* backend modal button end*/}
                {/* skill data card */}
                <div className=" d-flex flex-wrap">

                  {
                    backendSkills.length >0 ? backendSkills.map((item,i)=>{
                      return <div className="card m-2" key={i} style={{ width: "14rem" }}>
                      <div className="card-body">
                        <h5
                          className="card-title text-uppercase px-2 py-1 rounded"
                          style={{ backgroundColor: `${item.bgColor}` }}>
                          {item.name}
                        </h5>
                        <p className="card-text text-dark">
                          {item.description}
                        </p>
                        <h5>Percent: {item.percent}</h5>
                        <div className="d-flex">
                          <button
                            className="btn btn-primary me-2"
                            data-bs-toggle="modal" onClick={() => fetchSingleData(item._id)}
                            data-bs-target="#backendModalUpdate">
                            Update
                          </button>
                          <button onClick={()=>handleDelete(item._id)} className="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
                    })  : <h2>No Skill Added Yet !</h2>
                  }
                  
                </div>
                {/* skill data card end*/}
                {/* create skill modal */}
                <div className="modal fade" id="backendModal" tabindex="-1">
                  <div className="modal-dialog">
                    <form action="" onSubmit={handlebackendSkill}>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title text-dark">Add skill</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="my-2">
                            <label htmlFor="skillName" className="text-dark h4">
                              Skill Name
                            </label>
                            <input
                              id="skillName" defaultValue={BSkillName} onChange={(e)=>setBSkillName(e.target.value)}
                              type="text"
                              className="form-control text-dark"
                            />
                          </div>
                          <div className="my-2">
                            <label htmlFor="descSkill" className="text-dark h4">
                              Skill Description
                            </label>
                            <textarea
                              id="descSkill"
                              className="form-control text-dark" value={BSkillDesc} onChange={(e)=>setBSkillDesc(e.target.value)}/>
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="rangePercent"
                              className="form-label text-dark h4">
                              Skill Percentage
                            </label>
                            <input
                              type="range"
                              onChange={(e) =>
                                setbackendRangeValue(e.target.value)
                              }
                              className="form-range"
                              min="10"
                              max="100"
                              step="5"
                              id="rangePercent"
                            />
                            <span className="text-dark">
                              {backendRangeValue}
                            </span>
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="color"
                              className="form-label text-dark h4">
                              Bg color
                            </label>
                            <input
                              type="color"
                              id="color"
                              onChange={(e) => {
                                setBgColorbackend(e.target.value);
                              }}
                              className="form-control"
                            />
                            <span
                              className="text-dark p-2 m-3 mt-3 d-block"
                              style={{ backgroundColor: `${BgColorbackend}` }}>
                              {BgColorbackend}
                            </span>
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
                            Save Skill
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* create skill modal end*/}
                {/* Update skill modal */}
                <div
                  className="modal fade"
                  id="backendModalUpdate"
                  tabindex="-1">
                  <div className="modal-dialog">
                    <form action="" onSubmit={handleBackendUpdate}>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title text-dark">
                            Update skill
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="my-2">
                            <label htmlFor="skillName" className="text-dark h4">
                              Skill Name
                            </label>
                            <input
                              id="skillName"
                              type="text" onChange={(e)=>{setBSkillName(e.target.value)}} defaultValue={BSkillName}
                              className="form-control text-dark"
                            />
                          </div>
                          <div className="my-2">
                            <label htmlFor="descSkill" className="text-dark h4">
                              Skill Description
                            </label>
                            <textarea
                              id="descSkill" value={BSkillDesc} onChange={(e)=>{setBSkillDesc(e.target.value)}}
                              className="form-control text-dark"/>
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="rangePercent"
                              className="form-label text-dark h4">
                              Skill Percentage
                            </label>
                            <input
                              type="range"
                              onChange={(e) =>
                                setbackendRangeValue(e.target.value)
                              }
                              className="form-range"
                              min="10"
                              max="100"
                              step="5"
                              id="rangePercent"
                              defaultValue={backendRangeValue}
                            />
                            <span className="text-dark">
                              {backendRangeValue}
                            </span>
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="color"
                              className="form-label text-dark h4">
                              Bg color
                            </label>
                            <input
                              type="color"
                              id="color"
                              onChange={(e) => {
                                setBgColorbackend(e.target.value);
                              }}
                              defaultValue={BgColorbackend}
                              className="form-control"
                            />
                            <span
                              className="text-dark p-2 m-3 mt-3 d-block"
                              style={{ backgroundColor: `${BgColorbackend}` }}>
                              {BgColorbackend}
                            </span>
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
                            Update Skill
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* Update skill modal end*/}
              </div>
              {/* backend end*/}
    </>
  )
}

export default BackendSkill