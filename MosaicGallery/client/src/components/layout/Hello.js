import React from "react";
import mgLogoSm from ".././images/mgLogoSm.png"
import "./Layout.css"

export default function Hello() {
  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "40%",
      marginTop: "-0.5rem",
      textAlign: "center",
    }}>
        <h4 className="welcomeHdr">Hello and welcome to</h4>
        <img src={mgLogoSm} alt="Mosaic Gallery" className="welcomeLogo" />
            <br />
    </span>
  );
}