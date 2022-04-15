import React from 'react';
import byLogo from ".././images/byLogo.png"
import './Layout.css';


export default function Footer() {
    return (
        <>
            <div className="spacer75">&nbsp;</div>

            <footer className="footer">
                {/* <p className="littleEmblem"><sup>&#x24;</sup>&#x24;</p> */}
                <div className="footerDiv">
                    <p className="footerText"><span className="versionText">Version 1.0</span> &nbsp;&#169;2022 by </p>
                    <a href="https://github.com/helloamandaball"><img src={byLogo} alt="amanda" className="byLogoImg" /></a>
                </div>
            </footer>
    </>
    )
}