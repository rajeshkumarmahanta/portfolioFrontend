import React from "react";

const Education = ({item}) => {
  return (
    <>
      <div
        className=" d-block m-auto skill shadow p-4 my-4 skill-width rounded-2 "
        style={{ width: "900px" }}>
        <div>
            <h3><i className="ri-file-text-line ri-sm me-2"></i>{item.name}</h3>
            <div className="btns">
            <span className='btn-skill my-3 text-uppercase' style={{backgroundColor:item.bgColor}}>{item.passedYear}</span>
            <p className="mt-3"><i className="ri-school-fill ri-lg me-2"></i>{item.collegeName}</p>
            </div>
        </div>
          
      </div>
    </>
  );
};

export default Education;
