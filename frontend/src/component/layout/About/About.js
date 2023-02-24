import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";


const About = () => {

  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""    // needs an avatar from cloudinary ******
              alt="Founder"
            />
            <Typography>Jon Doe</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam ipsum, porta in diam quis, gravida volutpat nulla. Donec varius nulla ut urna venenatis.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.facebook.com/"
              target="blank"
            >
              <FacebookIcon className="facebookSvgIcon" />
            </a>

            <a href="https://instagram.com/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;