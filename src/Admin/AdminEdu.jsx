import React, { useEffect, useState } from "react";
import Sidemenu from "./components/Sidemenu";
import Footer from "./components/Footer";
import AdminNav from "./components/AdminNav";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminEdu = () => {
  const [educationName, setEducationName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [passedYear, setPassedYear] = useState("");
  const [eduBgColor, setEduBgColor] = useState("" || "#000000");
  const [updateId, setUpdateId] = useState("");
  const [educations, setEducations] = useState([]);
  const [change, setChange] = useState(false);
  const currentYear = new Date().getFullYear(); // Get the current year
  const handleEducation = (e) => {
    e.preventDefault();
    if (educationName == "" && collegeName == "") {
      toast.error("Please fill the details !");
      return;
    } else if (passedYear.length !== 4) {
      toast.error("Please fill Passed year Correctly !");
      return;
    } else if (isNaN(passedYear)) {
      toast.error("Please fill Passed year Correctly !");
      return;
    } else if (passedYear.trim() === "") {
      toast.error("Please fill Passed year Correctly !");
    } else if (
      parseInt(passedYear) < 2010 ||
      parseInt(passedYear) > currentYear
    ) {
      toast.error(`Year must be between 2010 and ${currentYear}!`);
      return;
    }
    axios
      .post(`${apiUrl}/education`, {
        educationName,
        collegeName,
        passedYear,
        eduBgColor,
      })
      .then((res) => {
        if (res.data == "eduAlreadyExist") {
          toast.info("Education Already Exist !");
          return;
        }
        if (res.data) {
          toast.success("Education Added !");
          setChange(!change)
        } else {
          toast.error("error !");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setEducationName("");
    setCollegeName("");
    setPassedYear("");
    setEduBgColor("" || "#000000");
  };
  useEffect(() => {
    axios
      .get(`${apiUrl}/education`)
      .then((res) => {
        console.log(res.data);
        setEducations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[change]);
  const handleEducationUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${apiUrl}/updateeducation/${updateId}`, {
        educationName,
        collegeName,
        passedYear,
        eduBgColor,
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
  const handleEducationDelete = (id) => {
    axios
      .delete(`${apiUrl}/educationdelete/${id}`)
      .then((res) => {
        if (res.data.deletedEdu) {
          toast.error("Skill Deleted !");
          setChange(!change)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchSingleEdu = (id) => {
    axios
      .get(`${apiUrl}/singleeducation/${id}`)
      .then((res) => {
        setPassedYear(res.data.passedYear);
        setEducationName(res.data.name);
        setCollegeName(res.data.collegeName);
        setEduBgColor(res.data.bgColor);
        setUpdateId(res.data._id);
        setChange(!change)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <AdminNav />
      <div id="layoutSidenav">
        <Sidemenu />
        <div id="layoutSidenav_content">
          <main>
            <div className="container text-light">
              <div className="container py-4">
                <h2 className="text-center text-decoration-underline py-3">
                  Education
                </h2>
                <span
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#educationModal">
                  Add Education
                </span>
                <div className=" d-flex flex-wrap">
                  {educations.length > 0 ? (
                    educations.map((item, i) => {
                      return (
                        <div
                          className="card m-2"
                          key={i}
                          style={{ width: "14rem" }}>
                          <div className="card-body">
                            <h5
                              className="card-title text-uppercase px-2 py-1 rounded"
                              style={{ backgroundColor: `${item.bgColor}` }}>
                              {item.passedYear}
                            </h5>
                            <p className="card-text text-dark">
                              {item.collegeName}
                            </p>
                            <p className="card-text text-dark">{item.name}</p>
                            <div className="d-flex">
                              <button
                                className="btn btn-primary me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#educationModalUpdate"
                                onClick={() => fetchSingleEdu(item._id)}>
                                Update
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleEducationDelete(item._id)}>
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h3 className="text-white">No education added yet!</h3>
                  )}
                </div>
                <div className="modal fade" id="educationModal" tabindex="-1">
                  <div className="modal-dialog">
                    <form action="" onSubmit={handleEducation}>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title text-dark">Education</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="my-2">
                            <label htmlFor="eduName" className="text-dark h4">
                              Education Name
                            </label>
                            <input
                              id="eduName"
                              type="text"
                              value={educationName}
                              onChange={(e) => setEducationName(e.target.value)}
                              className="form-control text-dark"
                            />
                          </div>
                          <div className="my-2">
                            <label htmlFor="clgName" className="text-dark h4">
                              College/School Name
                            </label>
                            <input
                              type="text"
                              id="clgName"
                              value={collegeName}
                              onChange={(e) => setCollegeName(e.target.value)}
                              // ,
                              className="form-control text-dark"
                            />
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="passedName"
                              className="text-dark h4">
                              Passed Year
                            </label>
                            <input
                              type="text"
                              value={passedYear}
                              onChange={(e) => setPassedYear(e.target.value)}
                              id="passedName"
                              className="form-control text-dark"
                            />
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
                              value={eduBgColor}
                              onChange={(e) => setEduBgColor(e.target.value)}
                              className="form-control"
                            />
                            <span
                              className="text-dark p-2 m-3 mt-3 d-block"
                              style={{ backgroundColor: `${eduBgColor}` }}>
                              {eduBgColor}
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
                            Save Education
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="educationModalUpdate"
                  tabindex="-1">
                  <div className="modal-dialog">
                    <form action="" onSubmit={handleEducationUpdate}>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title text-dark">Education</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className="my-2">
                            <label htmlFor="eduName" className="text-dark h4">
                              Education Name
                            </label>
                            <input
                              id="eduName"
                              type="text"
                              value={educationName}
                              onChange={(e) => setEducationName(e.target.value)}
                              className="form-control text-dark"
                            />
                          </div>
                          <div className="my-2">
                            <label htmlFor="clgName" className="text-dark h4">
                              College/School Name
                            </label>
                            <input
                              type="text"
                              id="clgName"
                              value={collegeName}
                              onChange={(e) => setCollegeName(e.target.value)}
                              className="form-control text-dark"
                            />
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="passedName"
                              className="text-dark h4">
                              Passed Year
                            </label>
                            <input
                              type="text"
                              value={passedYear}
                              onChange={(e) => setPassedYear(e.target.value)}
                              id="passedName"
                              className="form-control text-dark"
                            />
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
                              value={eduBgColor}
                              onChange={(e) => setEduBgColor(e.target.value)}
                              className="form-control"
                            />
                            <span
                              className="text-dark p-2 m-3 mt-3 d-block"
                              style={{ backgroundColor: `${eduBgColor}` }}>
                              {eduBgColor}
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
                            Update Education
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
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

export default AdminEdu;
