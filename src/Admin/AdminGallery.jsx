import React, { useEffect } from "react";
import AdminNav from "./components/AdminNav";
import Sidemenu from "./components/Sidemenu";
import Footer from "../Components/Footer";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminGallery = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("")
  const [change, setChange] = useState(false);
  const [images, setImages] = useState([]);
  
    const handleGallery = (e)=>{
      e.preventDefault();

      if(title=="" || image==""){
        toast.error("please select an image and write title");
        return;
      }
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      // console.log(title,image)
      
      axios.post(`${apiUrl}/gallery`,formData).then((res)=>{
        if (res.data) {
          toast.success("image Uploaded !");
          setChange(!change)
        } else {
          toast.error("Error !");
        }
      }).catch((err)=>{
        console.log(err)
      })
      setImage("");
      setTitle("");
    }
    const handleDelete = (id)=>{
      axios.delete(`${apiUrl}/gallery/${id}`).then((res)=>{
       
        if (res.data) {
          toast.success("image deleted !");
          setChange(!change)
        } else {
          toast.error("Error !");
        }
      }).catch((err)=>{
        console.log(err)
      })
      setChange(!change);
    }
    useEffect(()=>{
      axios.get(`${apiUrl}/gallery`).then((res)=>{
        setImages(res.data);
      }).catch((err)=>{
        console.log(err)
      })
    },[change,handleDelete])
  return (
    <>
      <AdminNav />
      <div id="layoutSidenav">
        <Sidemenu />
        <div id="layoutSidenav_content">
          <main>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                <div className="text-light py-4 m-3">
                  <form method="post" onSubmit={handleGallery} encType="multipart/formdata">
                    <div className="mb-3">
                      <label htmlFor="img" className="form-label fw-bold">
                        Images:
                      </label>
                      <input type="file" name="image"  onChange={(e) => setImage(e.target.files[0])} className="form-control" id="img" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label fw-bold" >
                        Title:
                      </label>
                      <input type="text" onChange={(e)=>setTitle(e.target.value)}  value={title} name="title" className="form-control" id="title" />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-3">
              <div className="img-container d-flex justify-content-center">
              {
                images.length > 0 ? images.map((item,i)=>{
                 return <div className="img" key={i}>
                  <img
                    src={`${apiUrl}/images/${item.image}`}
                    alt=""
                  />
                  <h5 className="mt-2 text-light">{item.title}</h5>
                  <MdDelete className="dltIcon" onClick={()=>handleDelete(item._id)} />
                </div>
                }) : <h4 className="text-light">No images Added yet</h4>
              }
                
                
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminGallery;
