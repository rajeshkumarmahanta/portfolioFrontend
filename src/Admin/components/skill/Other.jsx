import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
axios;
const Other = () => {
  const [othertoolRangeValue, setothertoolRangeValue] = useState(0);
  const [BgColorothertool, setBgColorothertool] = useState("" || "#000000");
  const [otherSkillName, setotherSkillName] = useState("");
  const [otherSkillDesc, setotherSkillDesc] = useState("");
  const [updateId, setupdateId] = useState("");
  const [OtherSkills, setOtherSkills] = useState([]);
  const [change, setChange] = useState(false);
  const handleOtherSkill = (e) => {
    e.preventDefault();
    if(othertoolRangeValue==0 && otherSkillName=="" && otherSkillDesc=="" ){
      toast.error("Please fill the text fields !");
      return;
    }

    axios
      .post(`http://localhost:3000/otherskill`, {
        othertoolRangeValue,
        BgColorothertool,
        otherSkillName,
        otherSkillDesc,
      })
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
        setothertoolRangeValue(0);
        setotherSkillName("");
        setotherSkillDesc("");
        setBgColorothertool("" || "#000000");
        setupdateId("");
  };
  const handleOtherSkillUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/updateotherskill/${updateId}`,{
        othertoolRangeValue,
        BgColorothertool,
        otherSkillName,
        otherSkillDesc,
      })
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
      .get(`http://localhost:3000/otherskill`)
      .then((res) => {
        setOtherSkills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);
  const handleDelete = (id)=>{
    axios
      .delete(`http://localhost:3000/otherskilldelete/${id}`)
      .then((res) => {
        if (res.data.deletedOther) {
          toast.error("Skill Deleted !");
          setChange(!change)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const fetchSingleData = (id) => {
    axios
      .get(`http://localhost:3000/singleotherskill/${id}`)
      .then((res) => {
        setothertoolRangeValue(res.data.percent);
        setotherSkillName(res.data.name);
        setotherSkillDesc(res.data.description);
        setBgColorothertool(res.data.bgColor);
        setupdateId(res.data._id);
        setChange(!change)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* Other tool */}
      <div className="container py-4">
        <h3>Other Tool</h3>
        {/* backend modal button */}
        <span
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#othertoolModal">
          Add othertool skill
        </span>
        {/* backend modal button end*/}
        {/* skill data card */}
        <div className=" d-flex flex-wrap">
        {
          OtherSkills.length > 0 ? OtherSkills.map((item,i)=>{
            return <div className="card m-2" key={i} style={{ width: "14rem" }}>
            <div className="card-body">
              <h5
                className="card-title text-uppercase px-2 py-1 rounded"
                style={{ backgroundColor: `${item.bgColor}` }}>
                {item.name}
              </h5>
              <p className="card-text text-dark">{item.description}</p>
                <h5>Percent: {item.percent}</h5>
              <div className="d-flex">
                <button
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal" onClick={()=>fetchSingleData(item._id)}
                  data-bs-target="#othertoolModalUpdate">
                  Update
                </button>
                <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div> 
          }):  <h2>No Skill Added Yet !</h2>
        }
          
        </div>
        {/* skill data card end*/}
        {/* create skill modal */}
        <div className="modal fade" id="othertoolModal" tabindex="-1">
          <div className="modal-dialog">
            <form action="" onSubmit={handleOtherSkill}>
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
                      value={otherSkillName}
                      id="skillName"
                      onChange={(e) => setotherSkillName(e.target.value)}
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
                      value={otherSkillDesc}
                      onChange={(e) => setotherSkillDesc(e.target.value)}
                      className="form-control text-dark"
                    />
                  </div>
                  <div className="my-2">
                    <label
                      htmlFor="rangePercent"
                      className="form-label text-dark h4">
                      Skill Percentage
                    </label>
                    <input
                      type="range"
                      onChange={(e) => setothertoolRangeValue(e.target.value)}
                      className="form-range"
                      min="10"
                      value={othertoolRangeValue}
                      max="100"
                      step="5"
                      id="rangePercent"
                    />
                    <span className="text-dark">{othertoolRangeValue}</span>
                  </div>
                  <div className="my-2">
                    <label htmlFor="color" className="form-label text-dark h4">
                      Bg color
                    </label>
                    <input
                      type="color"
                      value={BgColorothertool}
                      id="color"
                      onChange={(e) => {
                        setBgColorothertool(e.target.value);
                      }}
                      className="form-control"
                    />
                    <span
                      className="text-dark p-2 m-3 mt-3 d-block"
                      style={{
                        backgroundColor: `${BgColorothertool}`,
                      }}>
                      {BgColorothertool}
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
        <div className="modal fade" id="othertoolModalUpdate" tabindex="-1">
          <div className="modal-dialog">
            <form action="" onSubmit={handleOtherSkillUpdate}>
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
                      className="form-control text-dark" onChange={(e)=>setotherSkillName(e.target.value)}
                      value={otherSkillName}
                      
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="descSkill" className="text-dark h4">
                      Skill Description
                    </label>
                    <textarea id="descSkill" value={otherSkillDesc} onChange={(e)=>setotherSkillDesc(e.target.value)} className="form-control text-dark"/>
                  </div>
                  <div className="my-2">
                    <label
                      htmlFor="rangePercent"
                      className="form-label text-dark h4">
                      Skill Percentage
                    </label>
                    <input
                      type="range"
                      onChange={(e) => setothertoolRangeValue(e.target.value)}
                      className="form-range"
                      min="10"
                      max="100"
                      step="5"
                      id="rangePercent"
                      value={othertoolRangeValue}
                    />
                    <span className="text-dark">{othertoolRangeValue}</span>
                  </div>
                  <div className="my-2">
                    <label htmlFor="color" className="form-label text-dark h4">
                      Bg color
                    </label>
                    <input
                      type="color"
                      id="color"
                      onChange={(e) => {
                        setBgColorothertool(e.target.value);
                      }}
                      value={BgColorothertool}
                      className="form-control"
                    />
                    <span
                      className="text-dark p-2 m-3 mt-3 d-block"
                      style={{
                        backgroundColor: `${BgColorothertool}`,
                      }}>
                      {BgColorothertool}
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
      {/* Other tool end*/}
    </>
  );
};

export default Other;
