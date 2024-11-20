import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
const FrontendSkill = () => {
  // frontend states
  const [frontendRangeValue, setfrontendRangeValue] = useState(0);
  const [BgColorfrontend, setBgColorfrontend] = useState("" || "#000000");
  const [FSkillName, setFSkillName] = useState("");
  const [FSkillDesc, setFSkillDesc] = useState("");
  const [updateId, setupdateId] = useState("");
  const [frontendSkills, setFrontendSkills] = useState([]);
  const [change, setChange] = useState(false);
  const handleFrontend = (e) => {
    e.preventDefault();
    if(frontendRangeValue==0 && FSkillName=="" && FSkillDesc=="" ){
      toast.error("Please fill the text fields !");
      return;
    }
    axios.post(`http://localhost:3000/frontend`, { frontendRangeValue, BgColorfrontend, FSkillName, FSkillDesc }).then((res) => {
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
    }).catch((err) => {
      console.log(err)
    })
    setfrontendRangeValue(0);
    setBgColorfrontend("" || "#000000");
    setFSkillName("");
    setFSkillDesc("");
    setupdateId("");
  };

  // fetch data
  useEffect(() => {
    axios.get(`http://localhost:3000/frontend`).then((res) => {
      setFrontendSkills(res.data);
    }).catch((err) => {
      console.log(err)
    })

  }, [change]);

  const fetchSingleData = (id) => {
    axios.get(`http://localhost:3000/singlefrontend/${id}`).then((res) => {
      setfrontendRangeValue(res.data.percent);
      setFSkillName(res.data.name);
      setFSkillDesc(res.data.description);
      setBgColorfrontend(res.data.bgColor);
      setupdateId(res.data._id);
      setChange(!change)
    }).catch((err) => {
      console.log(err);
    })
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/updatefrontend/${updateId}`, { frontendRangeValue, BgColorfrontend, FSkillName, FSkillDesc }).then((res) => {
      if (res.data.acknowledged) {
        toast.success("Updated Success !");
        setChange(!change)
      } else {
        toast.error("Error !");
      }
    }).catch((err) => {
      console.log(err)
    });
    setfrontendRangeValue(0);
    setBgColorfrontend("" || "#000000");
    setFSkillName("");
    setFSkillDesc("");
    setupdateId("");
  }
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/frontenddelete/${id}`).then((res) => {
      if (res.data.deletedFrontend) {
        toast.error("Skill Deleted !");
        setChange(!change)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      {/* frontend */}
      <div className="container py-4">
        <h3>Frontend</h3>
        {/* frontend modal button */}
        <span
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#frontendModal">
          Add frontend skill
        </span>
        {/* frontend modal button end*/}
        {/* skill data card */}
        <div className=" d-flex flex-wrap">

          {
            frontendSkills.length > 0 ? frontendSkills.map((item, i) => {
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
                    <button onClick={() => fetchSingleData(item._id)}
                      className="btn btn-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#frontendModalUpdate">
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                  </div>
                </div>
              </div>
            }) : <h2>No Skill Added Yet !</h2>
          }
        </div>
        {/* skill data card end*/}
        {/* create skill modal */}
        <div className="modal fade" id="frontendModal" tabindex="-1">
          <div className="modal-dialog">
            <form action="" onSubmit={handleFrontend}>
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
                      type="text"
                      name=""
                      defaultValue={FSkillName}
                      onChange={(e) => setFSkillName(e.target.value)}
                      className="form-control text-dark"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="descSkill" className="text-dark h4">
                      Skill Description
                    </label>
                    <textarea
                      id="descSkill"
                      className="form-control text-dark"
                      defaultValue={FSkillDesc}
                      onChange={(e) => setFSkillDesc(e.target.value)}
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
                      onChange={(e) =>
                        setfrontendRangeValue(e.target.value)
                      }
                      className="form-range"
                      min="10"
                      max="100"
                      step="5"
                      id="rangePercent"
                    />
                    <span className="text-dark">
                      {frontendRangeValue}
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
                      id="color" defaultValue={BgColorfrontend}
                      onChange={(e) => {
                        setBgColorfrontend(e.target.value);
                      }}
                      className="form-control"
                    />
                    <span
                      className="text-dark p-2 m-3 mt-3 d-block"
                      style={{ backgroundColor: `${BgColorfrontend}` }}>
                      {BgColorfrontend}
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
          id="frontendModalUpdate"
          tabindex="-1">
          <div className="modal-dialog">
            <form action="" onSubmit={handleUpdate}>
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
                      defaultValue={FSkillName}
                      type="text" onChange={(e) => setFSkillName(e.target.value)}
                      className="form-control text-dark"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="descSkill" className="text-dark h4">
                      Skill Description
                    </label>
                    <textarea
                      id="descSkill" defaultValue={FSkillDesc} onChange={(e) => setFSkillDesc(e.target.value)}
                      className="form-control text-dark" />
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
                        setfrontendRangeValue(e.target.value)
                      }
                      defaultValue={frontendRangeValue}
                      className="form-range"
                      min="10"
                      max="100"
                      step="5"
                      id="rangePercent"
                    />
                    <span className="text-dark">
                      {frontendRangeValue}
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
                        setBgColorfrontend(e.target.value);
                      }}
                      defaultValue={BgColorfrontend}
                      className="form-control"
                    />
                    <span
                      className="text-dark p-2 m-3 mt-3 d-block"
                      style={{ backgroundColor: `${BgColorfrontend}` }}>
                      {BgColorfrontend}
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
      {/* frontend end*/}
    </>
  )
}

export default FrontendSkill