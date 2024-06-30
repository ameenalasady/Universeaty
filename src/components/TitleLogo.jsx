import React from "react";
import { ReactComponent as Logo } from "../logo.svg";

const TitleLogo = () => {
  return (
    <div className="titlecontainer">
      <div className="titletext">
        <a href="https://www.universeaty.ca/" className="logolink">
          <Logo className="logosvg" />
        </a>
      </div>
    </div>
  );
};

export default TitleLogo;
