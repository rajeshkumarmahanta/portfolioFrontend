import React, { useEffect, useState } from "react";
import Sidemenu from "./components/Sidemenu";
import Footer from "./components/Footer";
import AdminNav from "./components/AdminNav";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminServices = () => {
  const [serviceTitile, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceIcon, setServiceIcon] = useState("");
  const [serviceColor, setServiceColor] = useState("" || "#000000");
  const [services, setServices] = useState([]);
  const [updateId, setupdateId] = useState("");
  const [change, setChange] = useState(false);
  const handleService = (e) => {
    e.preventDefault();
    if(serviceTitile=="" && serviceDesc=="" && serviceIcon==""){
      toast.error("Please fill the Services Details !");
      return;
    }
    axios
      .post(`${apiUrl}/service`, {
        serviceTitile,
        serviceDesc,
        serviceIcon,
        serviceColor,
      })
      .then((res) => {
        if (res.data == "serviceAlreadyExist") {
          toast.info("Service Already Exist !");
          return;
        }
        if (res.data) {
          toast.success("Service Added !");
          setChange(!change)
        } else {
          toast.error("error !");
        }
      })
      .catch((err) => {
        console.log(err);
      });
      setServiceTitle("");
      setServiceDesc("");
      setServiceIcon(""); 
      setServiceColor("" || "#000000");
      
  };
  const handleServiceUpdate = (e) => {
    e.preventDefault();
    axios.put(`${apiUrl}/serviceupdate/${updateId}`,{
      serviceTitile,
      serviceDesc,
      serviceIcon,
      serviceColor,
    }).then((res)=>{
      if (res.data.acknowledged) {
        toast.success("Updated Success !");
        setChange(!change)
      } else {
        toast.error("Error !");
      }
    
    }).catch((err)=>{
      console.log(err);
    })
  };
useEffect(()=>{
axios.get(`${apiUrl}/service`).then((res)=>{
  setServices(res.data)

}).catch((err)=>{
  console.log(err);
})
},[change])

const fetchSingleService = (id)=>{
  axios.get(`${apiUrl}/singleservice/${id}`).then((res)=>{
    setServiceTitle(res.data.title);
    setServiceDesc(res.data.description);
    setServiceIcon(res.data.icon); 
    setServiceColor(res.data.color);
    setupdateId(res.data._id);
    setChange(!change)
  }).catch((err)=>{
    console.log(err);
  })
}
const handleDelete = (id)=>{
  axios
      .delete(`${apiUrl}/servicedelete/${id}`)
      .then((res) => {
        if (res.data.deletedService) {
          toast.error("Service Deleted !");
          setChange(!change)
        }
      })
      .catch((err) => {
        console.log(err);
      });
}
  return (
    <>
      <AdminNav />
      <div id="layoutSidenav">
        <Sidemenu />
        <div id="layoutSidenav_content">
          <main>
            <div className="container text-light">
              <h1 className="py-3">Service</h1>
              <div className="container">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#serviceModal">
                  Add services
                </button>
                <div className="d-flex flex-wrap">

                {
                  services.length > 0 ? services.map((item,i)=>{
                    return <div className="card m-2" key={i} style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-dark">
                      {item.description.slice(0,124)}...click update
                      </p>
                      <p className="" style={{color:`${item.color}`}}><i className={`${item.icon}`}></i></p>
                      {}
                      <h5>Color: {item.color}</h5>
                      <div className="d-flex">
                        <button
                          className="btn btn-primary me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#serviceModalUpdate" onClick={()=>fetchSingleService(item._id)}>
                          Update
                        </button>
                        <button className="btn btn-danger me-2" onClick={()=>handleDelete(item._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                  }) : <h2>No services Added yet!</h2>
                }
                  
                </div>
                {/* Modal Form */}
                <div className="modal fade" id="serviceModal" tabindex="-1">
                  <form action="" onSubmit={handleService}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-dark h5"
                            id="exampleModalLabel">
                            Add Services
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
                              htmlFor="serviceIcon "
                              className="form-label text-dark h5">
                              Service Icon class name (fontawesome)
                            </label>
                            <input
                              type="text"
                              value={serviceIcon}
                              onChange={(e) => setServiceIcon(e.target.value)}
                              className="form-control text-dark"
                              id="serviceIcon"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="serviceTitle "
                              className="form-label text-dark h5">
                              Service Title
                            </label>
                            <input
                              type="text"
                              value={serviceTitile}
                              onChange={(e) => setServiceTitle(e.target.value)}
                              className="form-control text-dark"
                              id="serviceTitle"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="serviceColor"
                              className="form-label text-dark h5">
                              Service Color
                            </label>
                            <input
                              type="color"
                              value={serviceColor}
                              onChange={(e) => setServiceColor(e.target.value)}
                              className="form-control text-dark"
                              id="serviceColor"
                            />
                            <span
                              className="text-dark p-2 m-3 mt-3 d-block"
                              style={{ backgroundColor: `${serviceColor}` }}>
                              {serviceColor}
                            </span>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="serviceDesc"
                              className="form-label text-dark h5">
                              Service Description
                            </label>
                            <textarea
                              className="form-control text-dark"
                              id="serviceDesc "
                              rows="3"
                              value={serviceDesc}
                              onChange={(e) => setServiceDesc(e.target.value)}
                            />
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

                {/* servicce modal update */}
                <div
                  className="modal fade"
                  id="serviceModalUpdate"
                  tabindex="-1">
                  <form action="" onSubmit={handleServiceUpdate}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-dark h5"
                            id="exampleModalLabel">
                            Update Services
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
                              htmlFor="serviceIcon "
                              className="form-label text-dark h5">
                              Service Icon class name (fontawesome)
                            </label>
                            <input
                              type="text"
                              value={serviceIcon}
                              onChange={(e) => setServiceIcon(e.target.value)}
                              className="form-control text-dark"
                              id="serviceIcon"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="serviceTitle "
                              className="form-label text-dark h5">
                              Service Title
                            </label>
                            <input
                              type="text"
                              value={serviceTitile}
                              onChange={(e) => setServiceTitle(e.target.value)}
                              className="form-control text-dark"
                              id="serviceTitle"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="serviceColor"
                              className="form-label text-dark h5">
                              Service Color
                            </label>
                            <input
                              type="color"
                              value={serviceColor}
                              onChange={(e) => setServiceColor(e.target.value)}
                              className="form-control text-dark"
                              id="serviceColor"
                            />
                            <span
                              className="text-dark p-2 m-3 mt-3 d-block"
                              style={{ backgroundColor: `${serviceColor}` }}>
                              {serviceColor}
                            </span>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="serviceDesc"
                              className="form-label text-dark h5">
                              Service Description
                            </label>
                            <textarea
                              className="form-control text-dark"
                              id="serviceDesc "
                              value={serviceDesc}
                              onChange={(e) => setServiceDesc(e.target.value)}
                              rows="3"
                            />
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
                            update
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

export default AdminServices;
