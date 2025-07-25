
import './About.css';
import './footer.css';
import { assets } from '../assets/assets';
import Footer from './Footer';

export default function About() {
  return (
    <>
      <div className="about-container">
        <h2 className="about-title">
          About <span className="about-title-underline">Our Brand</span>
        </h2>

        <p className="about-subtitle">
          Passionate About Properties, Dedicated to Your Vision
        </p>

        <div className="about-content">
          <img
            src={assets.brand_img}
            alt="Brand"
            className="about-image"
          />
          <div className="about-details">
            <div className="about-stats">
              <div className="stat-item">
                <p className="stat-value">10+</p>
                <p className="stat-label">Years of Excellence</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">50+</p>
                <p className="stat-label">Projects Completed</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">20+</p>
                <p className="stat-label">Mn. Sq. Ft. Delivered</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">25+</p>
                <p className="stat-label">Ongoing Projects</p>
              </div>
            </div>

            <p className="about-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            <button className="about-button">Learn more</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
