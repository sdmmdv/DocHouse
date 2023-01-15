import React from 'react';
import '../../styles/footer.css';

const Footer = () => (
  <div className="dh__footer section__padding">
    <div className="dh__footer-links">
      <div className="dh__footer-links_div">
        <h4>Links</h4>
        <p>Promotions</p>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="dh__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="dh__footer-links_div">
        <h4>Get in touch</h4>
        <p>Charlestown F32 142 SA Althedrion 13</p>
        <p>0883-13442567</p>
        <p>info@dochouse.com</p>
      </div>
    </div>

    <div className="dh__footer-copyright">
      <p>@2023 DOCHOUSE. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
