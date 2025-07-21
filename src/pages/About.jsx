// //About Page
// export default function About() {
//   return (
//     <div className="py-20 px-4 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4 text-slate-800">
//         About Real Estate
//       </h1>
//       <p className="mb-4 text-slate-700">
//         Real Estate is a leading real estate agency that specializes in helping
//         clients buy, sell, and rent properties in the most desirable
//         neighborhoods. Our team of experienced agents is dedicated to providing
//         exceptional service and making the buying and selling process as smooth
//         as possible.
//       </p>
//       <p className="mb-4 text-slate-700">
//         Our mission is to help our clients achieve their real estate goals by
//         providing expert advice, personalized service, and a deep understanding
//         of the local market. Whether you are looking to buy, sell, or rent a
//         property, we are here to help you every step of the way.
//       </p>
//       <p className="mb-4 text-slate-700">
//         Our team of agents has a wealth of experience and knowledge in the real
//         estate industry, and we are committed to providing the highest level of
//         service to our clients. We believe that buying or selling a property
//         should be an exciting and rewarding experience, and we are dedicated to
//         making that a reality for each and every one of our clients.
//       </p>
//     </div>
//   );
// }


import './About.css';
import './Footer.css';
import { assets } from '../assets/assets';
import Footer from './Footer'; // Make sure path is correct

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

      {/* ✅ Correct component usage */}
      <Footer />
    </>
  );
}
