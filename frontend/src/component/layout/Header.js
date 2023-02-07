import React from "react";
import { ReactNavbar } from "overlay-navbar";      // Takes care of the hamburger menu and acts as an overlay-navbar
import logo from "../../images/logo.png";

const options = {      // creating 'options' so that we can use it with 'ReactNavbar' as shown below for styling the overlay-navbar
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "rgba(0, 0, 0, 0.4)",
  logoHoverSize: "10px",
  logoHoverColor: "#F4AF33",//"#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return (
   <ReactNavbar {...options} />
  );
};

export default Header;