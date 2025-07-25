import React from 'react';
import  './footer.css';
import { assets } from '../assets/assets.js'; // assuming this provides logo_dark

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo and Description */}
          <div className="footer-column">
            <img src={assets.logo_dark} alt="Logo" className="footer-logo" />
            <p className="footer-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#Header">Home</a></li>
              <li><a href="#About">About us</a></li>
              <li><a href="#Contact">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-column">
            <h3 className="footer-title">Get in Touch</h3>
            <p className="footer-contact-text">
              Have any questions? Reach out to us directly and we'll get back to you as soon as possible.
            </p>
            <button className="footer-contact-button">Contact Us</button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom">
          <p>Copyright 2025 © EliteDwell. All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
