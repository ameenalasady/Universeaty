import React from "react";

const UniverseatyInfo = () => {
  return (
    <div className="modivcontainer">
      <div className="modiv">
        <div className="moimgcontainer">
          <img className="moimg" src="darkPic.svg" alt="templateimg" />
        </div>

        <div className="motext">
          <h1 className="heading">
            Get instant notifications when a seat opens in full classes,{" "}
            <span className="highlighted_word">for free</span>
          </h1>
          <p className="paragraph">
            Receive instant notifications in your email whenever a seat is
            available in your classes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniverseatyInfo;
