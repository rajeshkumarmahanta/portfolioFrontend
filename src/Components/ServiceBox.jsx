import React from "react";
import { Link } from "react-router-dom";
import ServiceReadmore from "./ServiceReadmore";

const ServiceBox = ({item}) => {
  return (
    <>
      <div className="service-box m-3">
        <div
          className="text-danger title-service"> <i className={item.icon} style={{color:item.color}}></i></div>
        <div>
          <h2 className="my-3 text-light">{item.title}</h2>
          <p className="text-light">{item.description.slice(0,100)}. . .</p>
        </div>
        <div>
              <Link to={`/servicereadmore/${item._id}`}
                className="text-decoration-underline"
                style={{ cursor: "pointer" }}>
                Read more
              </Link>
        </div>
      </div>
    </>
  );
};

export default ServiceBox;
