import React from "react";

const Skills = ({item}) => {

  return (
    <>
      <div
        className=" d-block m-auto skill text-light shadow skill-width p-4 my-4 rounded-2 "
        style={{ width: "900px" }}>
        <div>
          <div className="btns">
            <span
              className="btn-skill my-3 text-uppercase"
              style={{ backgroundColor: item.bgColor}}>
              {item.name}
            </span>
            <p className="mt-3">{item.description}</p>
          </div>
          <div className="progress-div">
            <div
              className="progress"
              role="progressbar"
              aria-label="Animated striped example"
              aria-valuenow={item.percent}
              aria-valuemin="0"
              aria-valuemax="100">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated fw-bold"
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: item.bgColor,
                }}>
                50%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
