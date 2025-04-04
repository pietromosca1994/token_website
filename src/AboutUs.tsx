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

      <main className="main-content" style={{ overflowY: 'auto' }}>
        <div className="about-container">
          
          {/* Headline & Introduction */}
          <section className="about-section hero-section">
            <h1 className="headline">Empowering Mobility & Energy Storage with Web3 Battery Intelligence</h1>
            <p className="intro-text">
              We leverage <strong>blockchain and AI-driven analytics</strong> to optimize <strong>battery performance, longevity, and compliance</strong>. 
              Our platform provides real-time <strong>data-driven insights</strong> for <strong>mobility and Battery Energy Storage Systems (BESS)</strong>, 
              ensuring efficiency, transparency, and alignment with <strong>the EU Battery Passport regulations</strong>.
            </p>
          </section>

          {/* Company Story */}
          <section className="about-section story-section">
            <h2>Our Journey</h2>
            <div className="section-content">
              <p>
                As the world transitions to <strong>electric mobility and renewable energy</strong>, battery management remains a challenge. 
                Traditional analytics lack <strong>transparency, interoperability, and real-time efficiency</strong>.  
                We founded our platform to bridge this gap using <strong>Web3 technologies, applied ML, and decentralized data governance</strong>.
              </p>
              <p>
                Our solutions provide <strong>actionable insights for OEMs, fleet operators, and energy storage providers</strong>, 
                enabling them to <strong>optimize battery health, predict failures, and comply with evolving regulations</strong>.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="about-section mission-vision-section">
            <div className="mission-vision-container">
              <div className="mission-box">
                <h3>Our Mission</h3>
                <p>
                  To <strong>unlock the full potential of battery assets</strong> using <strong>AI and blockchain</strong> while ensuring 
                  sustainability and regulatory compliance.
                </p>
              </div>
              <div className="vision-box">
                <h3>Our Vision</h3>
                <p>
                  To become the <strong>global leader</strong> in <strong>Web3-powered battery analytics</strong>, enabling a future where 
                  <strong>energy storage is smarter, more efficient, and seamlessly connected</strong> across the mobility 
                  and energy sectors.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="about-section features-section">
            <h2>Our Technology</h2>
            <div className="section-content">
              <ul className="features-list">
                <li><span>🔗 Blockchain-Powered Battery Passport</span> – Ensures <strong>traceability, security, and compliance</strong> with EU regulations.</li>
                <li><span>📊 AI-Driven Performance Optimization</span> – Predicts <strong>battery degradation, usage patterns, and lifecycle management</strong>.</li>
                <li><span>⚡ Real-Time Analytics for Mobility & BESS</span> – Provides actionable insights for <strong>EV fleets, grid operators, and energy providers</strong>.</li>
                <li><span>🛡️ Decentralized & Secure Data Layer</span> – Empowers <strong>battery owners with data sovereignty and monetization models</strong>.</li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="about-section cta-section">
            <h2>Join the Future of Web3 Battery Analytics</h2>
            <p>
              Whether you're an <strong>EV manufacturer, fleet operator, energy provider, or blockchain developer</strong>, 
              we invite you to <strong>partner with us</strong> in building the <strong>next-generation battery intelligence ecosystem</strong>.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">Contact Us</Link>
              <Link to="/careers" className="cta-button secondary">Explore Careers</Link>
            </div>
            <div className="social-links">
              <a href="#" className="social-icon linkedin">LinkedIn</a>
              <a href="#" className="social-icon twitter">Twitter</a>
              <a href="#" className="social-icon github">GitHub</a>
              <a href="#" className="social-icon discord">Discord</a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;
