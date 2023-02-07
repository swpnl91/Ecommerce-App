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

      <div className="rightFooter">
        <h4>Follow Us On</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://youtube.com">Youtube</a>
        <a href="http://instagram.com">Facebook</a>
      </div>

    </footer>
  );
};

export default Footer;