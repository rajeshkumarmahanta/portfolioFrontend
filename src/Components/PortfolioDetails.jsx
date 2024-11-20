import React from "react";
import { Link } from "react-router-dom";

const PortfolioDetails = ({item}) => {
  return (
    <>
      <div
        className=" d-block m-auto skill shadow skill-width p-3 my-4 rounded-2 portfolio-project"
        style={{ width: "900px" }}>
        <div className="d-flex d-md-flex d-lg-flex d-sm-flex flex-column flex-md-row flex-lg-row flex-sm-row">
          <i className="ri-code-box-fill ri-5x text-info m-auto"></i>
          <div className=" ms-4">
            <h3 className="title text-center text-sm-start text-md-start text-lg-start text-light">{item.title}</h3>
            <div className="buttons my-3 d-flex flex-wrap">
            <ul className="custom-list d-flex flex-wrap">
            {
              item.technology.map((tech,i)=>{
                return <li className="my-2" key={i}><span className="btn-port text-uppercase me-2 my-2">{tech}</span></li>
              })
            }
              </ul>
            </div>
            <p className="mb-1 text-light">{item.description}</p>
            <div className="link">
              <Link
                target="_blank"
                to={item.url}
                className="text-light p-project-link">
                View site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioDetails;
