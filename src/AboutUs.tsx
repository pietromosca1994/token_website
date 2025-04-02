import { Link } from "react-router-dom";
import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./AboutUs.css";

// About Us Page
function AboutUs() {
  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>

      <Header />

      <main className="main-content">
        <div className="about-container">
          {/* Headline & Introduction */}
          <section className="about-section hero-section">
            <h1 className="headline">Transforming Ideas into Digital Reality</h1>
            <p className="intro-text">
              We are a forward-thinking technology company dedicated to crafting innovative digital solutions 
              that empower businesses to thrive in an ever-evolving digital landscape.
            </p>
          </section>

          {/* Company Story */}
          <section className="about-section story-section">
            <h2>Our Journey</h2>
            <div className="section-content">
              <p>
                Founded in 2020, our journey began with a vision to bridge the gap between complex technology and practical business applications. 
                What started as a small team of passionate developers has evolved into a comprehensive digital solutions provider 
                trusted by businesses worldwide.
              </p>
              <p>
                Through our expertise and dedication, we've helped dozens of organizations overcome technological challenges 
                and unlock new opportunities for growth and innovation.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="about-section mission-vision-section">
            <div className="mission-vision-container">
              <div className="mission-box">
                <h3>Our Mission</h3>
                <p>
                  To deliver exceptional digital solutions that solve real-world problems and create measurable value 
                  for our clients and their customers.
                </p>
              </div>
              <div className="vision-box">
                <h3>Our Vision</h3>
                <p>
                  To be at the forefront of digital innovation, creating technology that makes the complex simple 
                  and the impossible achievable.
                </p>
              </div>
            </div>
          </section>

          {/* Team & Culture */}
          <section className="about-section team-section">
            <h2>Our Team & Culture</h2>
            <div className="section-content">
              <p>
                Behind every successful project is our exceptional team of developers, designers, strategists, and problem solvers. 
                United by a passion for excellence, we approach each challenge with creativity and technical precision.
              </p>
              <div className="core-values">
                <h3>Our Core Values</h3>
                <ul className="values-list">
                  <li><span>Innovation</span> - We continuously explore new technologies and approaches</li>
                  <li><span>Quality</span> - We deliver excellence in every line of code</li>
                  <li><span>Collaboration</span> - We believe the best solutions emerge from teamwork</li>
                  <li><span>Integrity</span> - We build relationships based on trust and transparency</li>
                </ul>
              </div>
              <div className="team-profiles">
                <div className="team-member">
                  <div className="member-photo profile-1"></div>
                  <h4>Sarah Johnson</h4>
                  <p>Chief Executive Officer</p>
                </div>
                <div className="team-member">
                  <div className="member-photo profile-2"></div>
                  <h4>Michael Chen</h4>
                  <p>Chief Technology Officer</p>
                </div>
                <div className="team-member">
                  <div className="member-photo profile-3"></div>
                  <h4>Elena Rodriguez</h4>
                  <p>Head of Design</p>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="about-section achievements-section">
            <h2>Our Achievements</h2>
            <div className="achievements-container">
              <div className="achievement-card">
                <div className="achievement-icon award-icon"></div>
                <h4>Excellence in Innovation</h4>
                <p>Recognized among Top 50 Tech Innovators, 2023</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon partnership-icon"></div>
                <h4>Strategic Partnerships</h4>
                <p>Official technology partner for leading enterprises</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon growth-icon"></div>
                <h4>Global Reach</h4>
                <p>Serving clients across 15+ countries worldwide</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="about-section cta-section">
            <h2>Join Our Journey</h2>
            <p>Whether you're looking for a technology partner or interested in joining our team, we'd love to connect.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">Contact Us</Link>
              <Link to="/careers" className="cta-button secondary">Explore Careers</Link>
            </div>
            <div className="social-links">
              <a href="#" className="social-icon linkedin">LinkedIn</a>
              <a href="#" className="social-icon twitter">Twitter</a>
              <a href="#" className="social-icon github">GitHub</a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;