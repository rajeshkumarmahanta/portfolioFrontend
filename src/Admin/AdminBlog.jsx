import React, { useEffect, useState } from 'react'
import Sidemenu from './components/Sidemenu'
import Footer from './components/Footer'
import AdminNav from './components/AdminNav'
import axios from 'axios'
import { toast } from 'react-toastify'
const apiUrl = import.meta.env.VITE_API_URL;
const AdminBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogUpdateId, setBlogUpdateId] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [change, setChange] = useState(false);
  const handleBlog = (e) => {
    e.preventDefault();
    if(blogTitle==="" || blogDesc==="" || blogImage===""){
      toast.error("Please fill the blog details!");
      return;
    }
    axios.post(`${apiUrl}/blog`, {
      blogTitle,
      blogDesc,
      blogImage
    }).then((res) => {
      // console.log(res.data)
      if (res.data == "blogAlreadyExist") {
        toast.info("Vlog Already Exist !");
        return;
      }
      if (res.data) {
        toast.success("Blog Added !");
        setChange(!change);
      } else {
        toast.error("error !");
      }
      
    }).catch((err) => {
      console.log(err)
    });
   
  }
  useEffect(() => {
    axios.get(`${apiUrl}/blog`).then((res) => {
      // console.log(res.data);
      setBlogs(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }, [change]);

  const fetchSingleBlog = (id) => {
    axios.get(`${apiUrl}/singleblog/${id}`).then((res) => {
      // console.log(res.data)
      setBlogTitle(res.data.title);
      setBlogDesc(res.data.description);
      setBlogImage(res.data.imageUrl);
      setBlogUpdateId(res.data._id);
      setChange(!change);
    }).catch((err) => {
      console.log(err)
    })
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${apiUrl}/blog/${blogUpdateId}`, {
      blogTitle,
      blogDesc,
      blogImage
    }).then((res) => {
      // console.log(res.data);
      if (res.data.acknowledged) {
        toast.success("Updated Success !");
        setChange(!change);
      } else {
        toast.error("Error !");
      }
    }).catch((err) => {
      console.log(err);
    })
  }
const handleDelete = (id)=>{
  axios.delete(`${apiUrl}/blog/${id}`).then((res)=>{
    if (res.data.deletedProject) {
      toast.error("Project Deleted !");
      setChange(!change);
    }
  }).catch((err)=>{
    console.log(err)
  })
  setChange(!change);
}
  return (
    <>
      <AdminNav />
      <div id="layoutSidenav">
        <Sidemenu />
        <div id="layoutSidenav_content">
          <main>
            <div className="container text-light">
              <h1 className='py-3'>Blog</h1>
              <div className="container">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#blogModal">
                  Add Blog
                </button>
                <div className="d-flex flex-wrap">
                  {
                    blogs.length > 0 ? blogs.map((item, i) => {
                      return <div className="card m-2" key={i} style={{ width: "18rem" }}>
                        <img src={item.imageUrl} className="card-img-top" alt="..." style={{height:"250px",objectFit:"cover",objectPosition:"center"}} />
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text text-dark">
                            {item.description.slice(0,180)}...
                          </p>
                          <div className="d-flex">
                            <button onClick={() => fetchSingleBlog(item._id)}
                              className="btn btn-primary me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#blogModalupdate">
                              Update
                            </button>
                            <button className="btn btn-danger me-2" onClick={()=>handleDelete(item._id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    }) : <h2>No blog added yet!</h2>
                  }

                </div>
                {/* Modal Form */}
                <div className="modal fade" id="blogModal" tabindex="-1">
                  <form action="" onSubmit={handleBlog}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-dark h5">
                            Add blog
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
                              htmlFor="blogTitle "
                              className="form-label text-dark h5">
                              Blog Title
                            </label>
                            <input
                              type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)}
                              className="form-control text-dark"
                              id="blogTitle"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="blogDesc"
                              className="form-label text-dark h5">
                              Blog Description
                            </label>
                            <textarea
                              className="form-control text-dark"
                              id="blogDesc" value={blogDesc} onChange={(e) => setBlogDesc(e.target.value)}
                              rows="3" />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="imageLink "
                              className="form-label text-dark h5">
                              Image Link (from unplash)
                            </label>
                            <input
                              type="text" value={blogImage} onChange={(e) => setBlogImage(e.target.value)}
                              className="form-control text-dark"
                              id="imageLink"
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

                {/* project modal update */}
                <div className="modal fade" id="blogModalupdate" tabindex="-1">
                  <form action="" onSubmit={handleUpdate}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-dark h5">
                            Update blog
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
                              htmlFor="blogTitle "
                              className="form-label text-dark h5">
                              Blog Title
                            </label>
                            <input
                              type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)}
                              className="form-control text-dark"
                              id="blogTitle"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="blogDesc"
                              className="form-label text-dark h5">
                              Blog Description
                            </label>
                            <textarea
                              className="form-control text-dark"
                              id="blogDesc" value={blogDesc} onChange={(e) => setBlogDesc(e.target.value)}
                              rows="3" />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="imageLink "
                              className="form-label text-dark h5">
                              Image Link (from unplash)
                            </label>
                            <input
                              type="text" value={blogImage} onChange={(e) => setBlogImage(e.target.value)}
                              className="form-control text-dark"
                              id="imageLink"
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
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default AdminBlog