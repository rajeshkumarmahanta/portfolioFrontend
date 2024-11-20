import React, { useEffect, useState } from "react";
import Sidemenu from "./components/Sidemenu";
import Footer from "./components/Footer";
import AdminNav from "./components/AdminNav";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminAbout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [resume, setResume] = useState(null);
  const [change, setChange] = useState(false);
  useEffect(() => {
    axios
      .get(`${apiUrl}/about`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setId(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  const handleAbout = (e) => {
    e.preventDefault();
    axios
      .put(`${apiUrl}/about/${id}`, { title, description })
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
  const handleResume = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    axios.post(`${apiUrl}/resume`,formData).then((res)=>{
      if (res.data) {
        toast.success("Resume Uploaded !");
        setChange(!change)
      } else {
        toast.error("Error !");
      }
    }).catch((err)=>{
      console.log(err)
    })
  };
  return (
    <>
      <AdminNav />
      <div id="layoutSidenav">
        <Sidemenu />
        <div id="layoutSidenav_content">
          <main>
            <div className="container text-light">
              <h2 className="text-center text-decoration-underline py-3">
                About
              </h2>
              <div className="">
                <form className="p-4" onSubmit={handleAbout}>
                  <div className="d-flex flex-column mb-2">
                    <label htmlFor="aboutTitle" className="my-2 h3">
                      About Title
                    </label>
                    <input
                      type="text"
                      name="aboutTitle"
                      id="aboutTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control text-dark"
                    />
                  </div>
                  <div className="d-flex flex-column mb-2">
                    <label htmlFor="aboutDesc" className="my-2 h3">
                      About Description
                    </label>
                    <textarea
                      name="aboutDesc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="aboutDesc"
                      className="form-control text-dark"></textarea>
                  </div>

                  <div className="mt-3">
                    <button className="btn btn-primary w-25" type="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="container text-light">
              <div className="d-flex flex-column mb-2">
                <form
                  action="" className="p-4"
                  onSubmit={handleResume}
                  encType="multipart/form-data">
                  <label htmlFor="resume" className="my-2 h3">
                    Resume
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setResume(e.target.files[0])}
                    name="resume"
                  />
                  <div className="mt-3">
                    <button className="btn btn-primary w-25" type="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminAbout;
