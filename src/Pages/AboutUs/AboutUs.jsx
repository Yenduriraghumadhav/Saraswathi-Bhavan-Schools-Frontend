import React from 'react'
import './aboutUs.css';
import aboutImg from '../../assets/about-us.jpg';

const AboutUs = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-left">
          <span className="about-tag">Empowering Minds Since 2004</span>
          <h1>
            Saraswathi Bhavan <span className="highlight">Schools</span>: <br />
            <span className="sub-heading">Shaping Futures with Knowledge</span>
          </h1>
          <div className="heading-divider"></div>

          <p className="about-description">
            At <strong>Saraswathi Bhavan Schools</strong>, our mission is to
            provide quality education that empowers students to grow
            intellectually, socially, and ethically. We focus on academic
            excellence, values-based learning, and overall development.
          </p>

          <p className="about-description">
            Our journey began with a vision to create an inspiring learning
            environment where every student can explore their full potential.
            Today, we are a trusted name in education with dedicated faculty
            and modern teaching methods.
          </p>
          <div className="fees-container">
            <h2>Saraswathi Bhavan Schools - Fee Structure</h2>

            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Tuition Fee</th>
                  <th>Admission Fee</th>
                  <th>Other Charges</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Nursery</td>
                  <td>₹75,000</td>
                  <td>₹8,000</td>
                  <td>₹5,000</td>
                  <td>₹88,000</td>
                </tr>

                <tr>
                  <td>LKG</td>
                  <td>₹78,000</td>
                  <td>₹8,000</td>
                  <td>₹5,000</td>
                  <td>₹91,000</td>
                </tr>

                <tr>
                  <td>UKG</td>
                  <td>₹80,000</td>
                  <td>₹8,000</td>
                  <td>₹5,000</td>
                  <td>₹93,000</td>
                </tr>

                <tr>
                  <td>Class 1 - 5</td>
                  <td>₹95,000</td>
                  <td>₹10,000</td>
                  <td>₹8,000</td>
                  <td>₹113,000</td>
                </tr>

                <tr>
                  <td>Class 6 - 8</td>
                  <td>₹100,000</td>
                  <td>₹12,000</td>
                  <td>₹10,000</td>
                  <td>₹122,000</td>
                </tr>

                <tr>
                  <td>Class 9 - 10</td>
                  <td>₹110,000</td>
                  <td>₹15,000</td>
                  <td>₹12,000</td>
                  <td>₹137,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="about-right">
          <div className="about-image">
            <img
              src={aboutImg}
              alt="students"
            />
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <h2>21+</h2>
              <p>Years Experience</p>
            </div>

            <div className="stat-card">
              <h2>1000+</h2>
              <p>Expert Teachers</p>
            </div>

            <div className="stat-card">
              <h2>15,000+</h2>
              <p>Successful Students</p>
            </div>

            <div className="stat-card">
              <h2>95%</h2>
              <p>Results Rate</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs