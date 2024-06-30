// Footer.js

import React from "react";

const Footer = ({ data }) => {
  return (
    <footer className={`footer ${!data ? "fixed-footer" : ""}`}>
      <div className="footercontainer">
        <p className="footer-paragraph2">This tool is fully open source.</p>
        <p className="footer-paragraph3">
          Check out the{" "}
          <a
            href="https://github.com/ameenalasady/Universeaty"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>{" "}
          for more information.
        </p>
        <p className="footer-paragraph1">
          © universeaty.ca, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
