import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const DatabaseSkill = () => {
  const [databaseRangeValue, setdatabaseRangeValue] = useState(0);
  const [BgColordatabase, setBgColordatabase] = useState(" " || "#000000");
  const [DSkillName, setDSkillName] = useState("");
  const [DSkillDesc, setDSkillDesc] = useState("");
  const [updateId, setupdateId] = useState("");
  const [DatabaseSkills, setDatabaseSkills] = useState([]);
  const [change, setChange] = useState(false);
  const handleUpdateDB = (e) => {
    e.preventDefault();
    if(databaseRangeValue==0 && DSkillName=="" && DSkillDesc=="" ){
      toast.error("Please fill the text fields !");
      return;
    }
    axios
      .put(`http://localhost:3000/updatedatabase/${updateId}`, {
        databaseRangeValue,
        BgColordatabase,
        DSkillName,
        DSkillDesc,
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
      setdatabaseRangeValue(0);
    setBgColordatabase(" " || "#000000");
    setDSkillName("");
    setDSkillDesc("");
    setupdateId("");
  };
  const handleDBSkill = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/database`, {
        databaseRangeValue,
        BgColordatabase,
        DSkillName,
        DSkillDesc,
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
    setdatabaseRangeValue(0);
    setBgColordatabase(" " || "#000000");
    setDSkillName("");
    setDSkillDesc("");
    setupdateId("");
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/database`)
      .then((res) => {
        setDatabaseSkills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/databasedelete/${id}`)
      .then((res) => {
        if (res.data.deletedDatabase) {
          toast.error("Skill Deleted !");
          setChange(!change)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSingleData = (id) => {
    axios
      .get(`http://localhost:3000/singledatabase/${id}`)
      .then((res) => {
        setdatabaseRangeValue(res.data.percent);
        setDSkillName(res.data.name);
        setDSkillDesc(res.data.description);
        setBgColordatabase(res.data.bgColor);
        setupdateId(res.data._id);
        setChange(!change)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* database */}
      <div className="container py-4">
        <h3>Database</h3>
        {/* backend modal button */}
        <span
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#databaseModal">
          Add database skill
        </span>
        {/* backend modal button end*/}
        {/* skill data card */}
        <div className=" d-flex flex-wrap">
          {DatabaseSkills.length > 0 ? (
            DatabaseSkills.map((item, i) => {
              return (
                <div className="card m-2" key={i} style={{ width: "14rem" }}>
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
                        data-bs-toggle="modal"
                        onClick={() => fetchSingleData(item._id)}
                        data-bs-target="#databaseModalUpdate">
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>No Skill Added Yet !</h2>
          )}
        </div>
        {/* skill data card end*/}
        {/* create skill modal */}
        <div className="modal fade" id="databaseModal" tabindex="-1">
          <div className="modal-dialog">
            <form action="" onSubmit={handleDBSkill}>
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
                      value={DSkillName}
                      onChange={(e) => setDSkillName(e.target.value)}
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
                      onChange={(e) => setDSkillDesc(e.target.value)}
                      className="form-control text-dark"
                      value={DSkillDesc}
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
                      value={databaseRangeValue}
                      onChange={(e) => setdatabaseRangeValue(e.target.value)}
                      className="form-range"
                      min="10"
                      max="100"
                      step="5"
                      id="rangePercent"
                    />
                    <span className="text-dark">{databaseRangeValue}</span>
                  </div>
                  <div className="my-2">
                    <label htmlFor="color" className="form-label text-dark h4">
                      Bg color
                    </label>
                    <input
                      type="color"
                      id="color"
                      onChange={(e) => {
                        setBgColordatabase(e.target.value);
                      }}
                      className="form-control"
                    />
                    <span
                      className="text-dark p-2 m-3 mt-3 d-block"
                      style={{ backgroundColor: `${BgColordatabase}` }}>
                      {BgColordatabase}
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
        <div className="modal fade" id="databaseModalUpdate" tabindex="-1">
          <div className="modal-dialog">
            <form action="" onSubmit={handleUpdateDB}>
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
                      value={DSkillName}
                      onChange={(e) => setDSkillName(e.target.value)}
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="descSkill" className="text-dark h4">
                      Skill Description
                    </label>
                    <textarea
                      id="descSkill"
                      onChange={(e) => setDSkillDesc(e.target.value)}
                      className="form-control text-dark"
                      value={DSkillDesc}
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
                      onChange={(e) => setdatabaseRangeValue(e.target.value)}
                      className="form-range"
                      min="10"
                      max="100"
                      step="5"
                      id="rangePercent"
                      value={databaseRangeValue}
                    />
                    <span className="text-dark">{databaseRangeValue}</span>
                  </div>
                  <div className="my-2">
                    <label htmlFor="color" className="form-label text-dark h4">
                      Bg color
                    </label>
                    <input
                      type="color"
                      id="color"
                      onChange={(e) => {
                        setBgColorbackend(e.target.value);
                      }}
                      value={BgColordatabase}
                      className="form-control"
                    />
                    <span
                      className="text-dark p-2 m-3 mt-3 d-block"
                      style={{ backgroundColor: `${BgColordatabase}` }}>
                      {BgColordatabase}
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
      {/* database end*/}
    </>
  );
};

export default DatabaseSkill;
