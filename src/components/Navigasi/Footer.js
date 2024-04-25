import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "../Style/Footer.css";

function Footer() {

  return (
    <div className="footer">
      <div className="socialMedia">
        <InstagramIcon /> <XIcon /> <FacebookIcon /> <LinkedInIcon />
      </div>
      <p> &copy; 2023 Vacaybot</p>
    </div>
  );
}

export default Footer;