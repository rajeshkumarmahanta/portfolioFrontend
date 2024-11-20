import React from "react";
import { Link } from "react-router-dom";

const BlogDetails = ({item}) => {
  // console.log(item);
  const formattedDate = new Date(item.updatedAt).toDateString();

  return (
    <>
      <div className="blog-box d-flex d-md-flex d-sm-flex d-lg-flex flex-column flex-md-row flex-lg-row flex-sm-row shadow mt-3">
        <div className="blog-left">
          <img src={item.imageUrl} className="blog-img " />
        </div>
        <div className="blog-right p-4">
          <div className="text">
            <h2 className="blog-title fw-bold text-light">{item.title}</h2>
            <h5 className="text-secondary">
              <i className="ri-calendar-event-line"></i> Posted on{" "}
              <span className="text-secondary">{formattedDate}</span>
            </h5>
            <p className="text-light">
             {item.description.slice(0,200)} . . .
            </p>
            <Link
              className="text-decoration-none text-light readmore-btn-blog d-flex flex-row align-items-center"
              to={`/blog/${item._id}`} >
              Read more{" "}
              <i className="ri-arrow-right-double-line ri-lg rd-icon"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
