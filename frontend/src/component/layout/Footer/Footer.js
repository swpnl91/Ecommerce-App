import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";



const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>1-stopShop</h1>
        <p>Your wish is our command!</p>

        <p>&copy; 2023; JhumriTalaiya, Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;