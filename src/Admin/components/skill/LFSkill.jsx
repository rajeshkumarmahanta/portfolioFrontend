import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LFSkill = () => {
  const [libraryFrameworkRangeValue, setlibraryFrameworkRangeValue] =
    useState(0);
  const [BgColorlibraryFramework, setBgColorlibraryFramework] = useState(
    "" || "#000000"
  );
  const [LFSkillName, setLFSkillName] = useState("");
  const [LFSkillDesc, setLFSkillDesc] = useState("");
  const [updateId, setupdateId] = useState("");
  const [LFSkills, setLFSkills] = useState([]);
  const [change, setChange] = useState(false);
  const handleLF = (e) => {
    e.preventDefault();
    if(libraryFrameworkRangeValue==0 && LFSkillName=="" && LFSkillDesc=="" ){
      toast.error("Please fill the text fields !");
      return;
    }
    axios.post(`http://localhost:3000/libraryFramework`,{LFSkillName,LFSkillDesc,BgColorlibraryFramework,libraryFrameworkRangeValue}).then((res)=>{
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
        console.log(err);
    })
  };
  const handleLFUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/updatelibraryframework/${updateId}`, {LFSkillName,LFSkillDesc,BgColorlibraryFramework,libraryFrameworkRangeValue})
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Updated Success !");
          setChange(!change)
        } else {
          toast.error("Error !");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/libraryframework`)
      .then((res) => {
        setLFSkills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);
  const fetchSingleData = (id) => {
    axios
      .get(`http://localhost:3000/singlelibraryframework/${id}`)
      .then((res) => {
        setlibraryFrameworkRangeValue(res.data.percent);
        setLFSkillName(res.data.name);
        setLFSkillDesc(res.data.description);
        setBgColorlibraryFramework(res.data.bgColor);
        setupdateId(res.data._id);
        setChange(!change)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/libraryframeworkdelete/${id}`)
      .then((res) => {
        if (res.data.deletedLF) {
          toast.error("Skill Deleted !");
          setChange(!change)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <>
      {/* library/framework */}
      <div className="container py-4">
        <h3>Library/Framework</h3>
        {/* backend modal button */}
        <span
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#libraryFrameworkModal">
          Add libraryFramework skill
        </span>
        {/* backend modal button end*/}
        {/* skill data card */}
        <div className=" d-flex flex-wrap">
        {
            LFSkills.length > 0 ? LFSkills.map((item,i)=>{
                return <div className="card m-2" key={i} style={{ width: "14rem" }}>
            <div className="card-body">
              <h5
                className="card-title text-uppercase px-2 py-1 rounded"
                style={{
                  backgroundColor: `${item.bgColor}`,
                }}>
                {item.name}
              </h5>
              <p className="card-text text-dark">{item.description}</p>
              <h5>Percent: {item.percent}</h5>
              <div className="d-flex">
                <button
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#libraryFrameworkModalUpdate" onClick={()=>fetchSingleData(item._id)}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>
            }) :  <h2>No Skill Added Yet !</h2>
        }
          
        </div>
        {/* skill data card end*/}
        {/* create skill modal */}
        <div className="modal fade" id="libraryFrameworkModal" tabindex="-1">
          <div className="modal-dialog">
            <form action="" onSubmit={handleLF}>
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
                      id="skillName"
                      type="text" value={LFSkillName} onChange={(e)=>setLFSkillName(e.target.value)}
                      className="form-control text-dark"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="descSkill" className="text-dark h4">
                      Skill Description
                    </label>
                    <textarea
                      id="descSkill" value={LFSkillDesc} onChange={(e)=>setLFSkillDesc(e.target.value)}
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
                        setlibraryFrameworkRangeValue(e.target.value)
                      } value={libraryFrameworkRangeValue}
                      className="form-range"
                      min="10"
                      max="100"
                      step="5"
                      id="rangePercent"
                    />
                    <span className="text-dark">
                      {libraryFrameworkRangeValue}
                    </span>
                  </div>
                  <div className="my-2">
                    <label htmlFor="color" className="form-label text-dark h4">
                      Bg color
                    </label>
                    <input
                      type="color"
                      id="color" value={BgColorlibraryFramework}
                      onChange={(e) => {
                        setBgColorlibraryFramework(e.target.value);
                      }}
                      className="form-control"
                    />
                    <span
                      className="text-dark p-2 m-3 mt-3 d-block"
                      style={{
                        backgroundColor: `${BgColorlibraryFramework}`,
                      }}>
                      {BgColorlibraryFramework}
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
          id="libraryFrameworkModalUpdate"
          tabindex="-1">
          <div className="modal-dialog">
            <form action="" onSubmit={handleLFUpdate}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-dark">Update skill</h5>
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
                      type="text"
                      className="form-control text-dark"
                      value={LFSkillName} onChange={(e)=>setLFSkillName(e.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="descSkill" className="text-dark h4">
                      Skill Description
                    </label>
                    <textarea id="descSkill" className="form-control text-dark" value={LFSkillDesc} onChange={(e)=>setLFSkillDesc(e.target.value)}/>
                      
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
                        setlibraryFrameworkRangeValue(e.target.value)
                      }
                      className="form-range"
                      min="10"
                      max="100"
                      step="5"
                      id="rangePercent"
                      value={libraryFrameworkRangeValue}
                    />
                    <span className="text-dark">
                      {libraryFrameworkRangeValue}
                    </span>
                  </div>
                  <div className="my-2">
                    <label htmlFor="color" className="form-label text-dark h4">
                      Bg color
                    </label>
                    <input
                      type="color"
                      id="color"
                      onChange={(e) => {
                        setBgColorlibraryFramework(e.target.value);
                      }}
                      value={BgColorlibraryFramework}
                      className="form-control"
                    />
                    <span
                      className="text-dark p-2 m-3 mt-3 d-block"
                      style={{
                        backgroundColor: `${BgColorlibraryFramework}`,
                      }}>
                      {BgColorlibraryFramework}
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
      {/* libraryframework end*/}
    </>
  );
};

export default LFSkill;
