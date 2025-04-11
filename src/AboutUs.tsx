import { Link } from "react-router-dom";
import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./AboutUs.css";
import { DISCORD_CHANNEL, X_CHANNEL } from "./main";

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
          
          {/* Hero Section with Interactive Elements */}
          <section className="about-section hero-section">
            <div className="hero-content">
              <h1 className="headline">Revolutionizing Battery Intelligence with Web3</h1>
              <p className="tagline">Transforming Mobility & Energy Storage with Blockchain-Verified Analytics</p>
              <div className="hero-cta">
                <Link to="/how-it-works" className="hero-button">Discover Our Solutions</Link>
              </div>
            </div>
          </section>

          {/* Value Proposition Cards */}
          <section className="about-section value-prop-section">
            <div className="value-cards">
              <div className="value-card">
                <div className="card-icon">🔍</div>
                <h3>Advanced Analytics</h3>
                <p>Machine learning algorithms deliver actionable insights for optimal battery performance</p>
              </div>
              <div className="value-card">
                <div className="card-icon">🔗</div>
                <h3>Blockchain Secured</h3>
                <p>Tamper-proof battery data compliance with EU Battery Passport regulations</p>
              </div>
              <div className="value-card">
                <div className="card-icon">📊</div>
                <h3>Lifecycle Optimization</h3>
                <p>Extend battery lifespan and maximize value across mobility and energy storage</p>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section with Visual Split */}
          <section className="about-section mission-vision-section">
            <div className="section-header">
              <h2>Our Purpose</h2>
              <div className="section-divider"></div>
            </div>
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

          {/* Technology Features with Interactive Hover */}
          <section className="about-section tech-features-section">
            <div className="section-header">
              <h2>Our Technology</h2>
              <div className="section-divider"></div>
            </div>
            <div className="tech-features-grid">
              <div className="tech-feature">
                <div className="feature-icon">🔍</div>
                <h3>Smart Battery Insights</h3>
                <p>Advanced AI algorithms detect patterns and optimize performance across battery lifecycle</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">🔗</div>
                <h3>EU Compliance</h3>
                <p>Blockchain-secured Battery Passport ensuring regulatory adherence and transparency</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">📊</div>
                <h3>Predictive Monitoring</h3>
                <p>Real-time health forecasting preventing failures and extending operational lifespan</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">⚡</div>
                <h3>Unified Optimization</h3>
                <p>Comprehensive management across electric vehicles, energy storage and grid systems</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">🛡️</div>
                <h3>Decentralized Architecture</h3>
                <p>Secure data sharing with stakeholders through decentralized governance protocols</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">🔄</div>
                <h3>Circular Economy</h3>
                <p>Supporting battery reuse, recycling and second-life applications with verified data</p>
              </div>
            </div>
          </section>

          {/* Problem-Solution Section
          <section className="about-section problem-solution-section">
            <div className="section-header">
              <h2>Addressing Critical Challenges</h2>
              <div className="section-divider"></div>
            </div>
            <div className="problem-solution-container">
              <div className="problem-box">
                <h3>Industry Challenges</h3>
                <ul className="challenge-list">
                  <li>Lack of transparent battery performance data</li>
                  <li>Cross-platform compatibility issues</li>
                  <li>Limited real-time monitoring capabilities</li>
                  <li>Complex regulatory compliance requirements</li>
                  <li>Inefficient battery lifecycle management</li>
                </ul>
              </div>
              <div className="solution-box">
                <h3>Our Approach</h3>
                <ul className="solution-list">
                  <li>Decentralized data governance protocols</li>
                  <li>Applied machine learning for performance optimization</li>
                  <li>Web3 interoperability across platforms</li>
                  <li>Blockchain-verified compliance documentation</li>
                  <li>End-to-end lifecycle intelligence</li>
                </ul>
              </div>
            </div>
          </section> */}

          {/* Applications Carousel */}
          <section className="about-section applications-section">
            <div className="section-header">
              <h2>Application Areas</h2>
              <div className="section-divider"></div>
            </div>
            <div className="application-cards">
              <div className="application-card">
                <div className="app-icon">🚚</div>
                <h3>EV Fleet Management</h3>
                <p>Optimize charging strategies, predict range variations, and maximize battery longevity for commercial electric fleets.</p>
              </div>
              <div className="application-card">
                <div className="app-icon">⚡</div>
                <h3>Grid-Scale BESS</h3>
                <p>Enhance energy arbitrage, frequency regulation, and power quality while extending battery lifecycle for utility-scale installations.</p>
              </div>
              <div className="application-card">
                <div className="app-icon">🏭</div>
                <h3>OEM Integration</h3>
                <p>Provide manufacturers with battery performance insights to improve design, warranty management, and second-life applications.</p>
              </div>
            </div>
          </section>

          {/* Team Section with Enhanced Styling */}
          <section className="about-section team-section">
            <div className="section-header">
              <h2>Our Leadership Team</h2>
              <div className="section-divider"></div>
            </div>
            <div className="team-profiles">
              <div className="team-member">
                <div className="member-photo profile-1"></div>
                <div className="member-info">
                  <h4><a href="https://www.linkedin.com/in/fabrizio-martini-39068320/" target="_blank" rel="noopener noreferrer">
                    Fabrizio Martini
                  </a></h4>
                  <p className="member-title">Chief Executive Officer</p>
                  <p className="member-description">Battery technology expert with 15+ years in energy storage solutions</p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-photo profile-2"></div>
                <div className="member-info">
                  <h4><a href="https://www.linkedin.com/in/pietro-mosca/" target="_blank" rel="noopener noreferrer">
                    Pietro Mosca
                  </a></h4>
                  <p className="member-title">Blockchain Research Engineer</p>
                  <p className="member-description">Web3 specialist focused on decentralized data solutions</p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-photo profile-3"></div>
                <div className="member-info">
                  <h4><a href="https://www.linkedin.com/in/giovannirossi92/" target="_blank" rel="noopener noreferrer">
                    Giovanni Rossi
                  </a></h4>
                  <p className="member-title">Head of Marketing</p>
                  <p className="member-description">Strategic communications expert for tech innovation</p>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Call to Action */}
          <section className="about-section cta-section">
            <div className="cta-content">
              <h2>Transform Your Battery Management Strategy</h2>
              <p>Join forward-thinking organizations already leveraging our Web3-powered analytics platform</p>
              <div className="cta-buttons">
                {/* <Link to="/contact" className="cta-button primary">Schedule a Demo</Link>
                <Link to="/platform" className="cta-button secondary">Explore Platform</Link> */}
              </div>
              <div className="social-links">
                <a href={DISCORD_CHANNEL} target="_blank" className="social-icon discord">Discord</a>
                <a href={X_CHANNEL} target="_blank" className="social-icon X">X</a>
              </div>
            </div>
          </section>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;