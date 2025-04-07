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
            <h1 className="headline">Web3-Powered Battery Analytics for Mobility and Energy Storage</h1>
            <p className="intro-text">
              We leverage <strong>blockchain technology and advanced machine learning</strong> to deliver 
              <strong> actionable battery insights</strong>. Our platform optimizes <strong>battery performance, 
              extends lifecycles, and ensures compliance</strong> with EU Battery Passport regulations for both 
              <strong> mobility and Battery Energy Storage Systems (BESS)</strong>.
            </p>
          </section>

          {/* Company Story */}
          <section className="about-section story-section">
            <h2>Our Purpose</h2>
            <div className="section-content">
              <p>
                The transition to <strong>electrified transport and renewable energy storage</strong> faces critical challenges 
                in battery management and utilization. Traditional systems lack <strong>transparent data access, cross-platform 
                compatibility, and real-time monitoring capabilities</strong>.
              </p>
              <p>
                We created our platform to address these challenges through <strong>decentralized data governance, applied machine 
                learning, and Web3 interoperability</strong>. Our solutions empower <strong>fleet operators, OEMs, energy providers, 
                and grid operators</strong> with the intelligence needed to maximize battery value throughout their lifecycle.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="about-section mission-vision-section">
            <div className="mission-vision-container">
              <div className="mission-box">
                <h3>Our Mission</h3>
                <p>
                  To <strong>transform battery asset management</strong> through <strong>data-driven intelligence and blockchain verification</strong>, 
                  enabling optimal performance while ensuring complete regulatory compliance.
                </p>
              </div>
              <div className="vision-box">
                <h3>Our Vision</h3>
                <p>
                  Creating an <strong>interconnected ecosystem</strong> where <strong>battery data flows securely</strong> between stakeholders, 
                  enabling <strong>smarter decisions, longer battery life, and sustainable energy transitions</strong> across mobility and grid applications.
                </p>
              </div>
            </div>
          </section>

          {/* Team Profiles Section */}
          <section className="about-section team-section">
            <h2>Our Team</h2>
            <div className="section-content">
              <div className="team-profiles">
                <div className="team-member">
                  <div className="member-photo profile-1"></div>
                  <h4><a href="https://www.linkedin.com/in/fabrizio-martini-39068320/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                  Fabrizio Martini
                  </a></h4>
                  <p>Chief Executive Officer</p>
                </div>
                <div className="team-member">
                  <div className="member-photo profile-2"></div>
                  <h4><a href="https://www.linkedin.com/in/pietro-mosca/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                  Pietro Mosca
                  </a></h4>
                  <p>Blockchain Research Engineer</p>
                </div>
                <div className="team-member">
                  <div className="member-photo profile-3"></div>
                  <h4><a href="https://www.linkedin.com/in/giovannirossi92/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                  Giovanni Rossi 
                  </a></h4>
                  <p>Head of Marketing</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="about-section features-section">
            <h2>Our Technology</h2>
            <div className="section-content">
              <ul className="features-list">
                <li><span>🔍 Advanced Battery Analytics</span> – Uses <strong>ML algorithms to analyze battery performance patterns</strong> and identify optimization opportunities.</li>
                <li><span>🔗 EU Battery Passport Compliance</span> – Provides <strong>blockchain-verified documentation</strong> for regulatory requirements and sustainability tracking.</li>
                <li><span>📊 Predictive Health Monitoring</span> – <strong>Forecasts degradation, alerts to potential failures</strong>, and recommends maintenance interventions.</li>
                <li><span>⚡ Cross-Platform Optimization</span> – Delivers <strong>unified insights across EV fleets, stationary storage, and grid applications</strong>.</li>
                <li><span>🛡️ Decentralized Data Architecture</span> – Ensures <strong>data sovereignty while enabling secure sharing</strong> between authorized stakeholders.</li>
              </ul>
            </div>
          </section>

          {/* Applications Section */}
          <section className="about-section applications-section">
            <h2>Applications</h2>
            <div className="section-content">
              <div className="application-cards">
                <div className="application-card">
                  <h3>EV Fleet Management</h3>
                  <p>Optimize charging strategies, predict range variations, and maximize battery longevity for commercial electric fleets.</p>
                </div>
                <div className="application-card">
                  <h3>Grid-Scale BESS</h3>
                  <p>Enhance energy arbitrage, frequency regulation, and power quality while extending battery lifecycle for utility-scale installations.</p>
                </div>
                <div className="application-card">
                  <h3>OEM Integration</h3>
                  <p>Provide manufacturers with battery performance insights to improve design, warranty management, and second-life applications.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="about-section cta-section">
            <h2>Transform Your Battery Management Strategy</h2>
            <p>
              Whether you're a <strong>fleet operator looking to reduce TCO, a BESS provider maximizing ROI, or an OEM ensuring compliance</strong>, 
              our platform delivers the <strong>insights and verification</strong> you need in today's evolving regulatory landscape.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">Schedule a Demo</Link>
              <Link to="/use-cases" className="cta-button secondary">Explore Use Cases</Link>
            </div>
            <div className="social-links">
              <a href="#" className="social-icon discord">Discord</a>
              <a href="#" className="social-icon X">X</a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;