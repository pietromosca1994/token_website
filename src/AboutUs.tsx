import { Link } from "react-router-dom";
import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./AboutUs.css";
import { DISCORD_CHANNEL, X_CHANNEL } from "./main";

// SVG Icon Components
const AnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 9l-3.5 3.5L12 10l-4 4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18" cy="9" r="1.5" />
    <circle cx="12" cy="10" r="1.5" />
    <circle cx="8" cy="14" r="1.5" />
  </svg>
);

const BlockchainIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 7h10v4H7z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11v6M14 11v6M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 7h18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LifecycleIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 12a5 5 0 009.9-1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PredictiveIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
    <circle cx="12" cy="12" r="5" strokeLinecap="round" />
  </svg>
);

const UnifiedIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 4V3M18 21v-1M12 21v-1M6 21v-1M6 4V3M12 4V3M19 12h1M4 12h1" strokeLinecap="round" />
    <path d="M16 16h.01M12 16h.01M8 16h.01M16 12h.01M12 12h.01M8 12h.01M16 8h.01M12 8h.01M8 8h.01" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2" y="6" width="20" height="12" rx="2" strokeLinecap="round" />
  </svg>
);

const SecureIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l8 4v6c0 5.1-3.66 9.37-8.5 10-4.62-.62-8.5-4.88-8.5-10V7l9-4z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CircularIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 10c0-1.8.53-3.5 1.46-4.94m14.08 10.88A9.96 9.96 0 0120 10" strokeLinecap="round" />
    <path d="M17.5 6.5L20 4l-2.5 2.5zM4 4l2.5 2.5L4 9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22c5.5-1 8.5-6 8.5-12H18" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22c-5.5-1-8.5-6-8.5-12H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EVFleetIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 17h10a2 2 0 002-2V9a2 2 0 00-2-2h-2l-2-3H9L7 7H5a2 2 0 00-2 2v6a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="14" r="2" strokeLinecap="round" />
    <circle cx="16" cy="14" r="2" strokeLinecap="round" />
    <path d="M5 10h14" strokeLinecap="round" />
    <path d="M20 12h2v2M4 12H2v2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22v-6M15 18h-6M2 12h20M12 2v6M9 6h6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M5 14v4a2 2 0 002 2h10a2 2 0 002-2v-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ManufacturingIcon = () => (
  <svg viewBox="0 0 24 24" className="feature-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 8h1a4 4 0 010 8h-1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 2v6M10 2v6M14 2v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
                <Link to="/how-it-works" className="hero-button">How it Works</Link>
              </div>
            </div>
          </section>

          {/* Value Proposition Cards */}
          <section className="about-section value-prop-section">
            <div className="value-cards">
              <div className="value-card">
                <div className="card-icon">
                  <AnalyticsIcon />
                </div>
                <h3>Advanced Analytics</h3>
                <p>Machine learning algorithms deliver actionable insights for optimal battery performance</p>
              </div>
              <div className="value-card">
                <div className="card-icon">
                  <BlockchainIcon />
                </div>
                <h3>Blockchain Secured</h3>
                <p>Tamper-proof battery data compliance with EU Battery Passport regulations</p>
              </div>
              <div className="value-card">
                <div className="card-icon">
                  <LifecycleIcon />
                </div>
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
                <div className="feature-icon">
                  <AnalyticsIcon />
                </div>
                <h3>Smart Battery Insights</h3>
                <p>Advanced AI algorithms detect patterns and optimize performance across battery lifecycle</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">
                  <BlockchainIcon />
                </div>
                <h3>EU Compliance</h3>
                <p>Blockchain-secured Battery Passport ensuring regulatory adherence and transparency</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">
                  <PredictiveIcon />
                </div>
                <h3>Predictive Monitoring</h3>
                <p>Real-time health forecasting preventing failures and extending operational lifespan</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">
                  <UnifiedIcon />
                </div>
                <h3>Unified Optimization</h3>
                <p>Comprehensive management across electric vehicles, energy storage and grid systems</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">
                  <SecureIcon />
                </div>
                <h3>Decentralized Architecture</h3>
                <p>Secure data sharing with stakeholders through decentralized governance protocols</p>
              </div>
              <div className="tech-feature">
                <div className="feature-icon">
                  <CircularIcon />
                </div>
                <h3>Circular Economy</h3>
                <p>Supporting battery reuse, recycling and second-life applications with verified data</p>
              </div>
            </div>
          </section>

          {/* Applications Carousel */}
          <section className="about-section applications-section">
            <div className="section-header">
              <h2>Application Areas</h2>
              <div className="section-divider"></div>
            </div>
            <div className="application-cards">
              <div className="application-card">
                <div className="app-icon">
                  <EVFleetIcon />
                </div>
                <h3>EV Fleet Management</h3>
                <p>Optimize charging strategies, predict range variations, and maximize battery longevity for commercial electric fleets.</p>
              </div>
              <div className="application-card">
                <div className="app-icon">
                  <GridIcon />
                </div>
                <h3>Grid-Scale BESS</h3>
                <p>Enhance energy arbitrage, frequency regulation, and power quality while extending battery lifecycle for utility-scale installations.</p>
              </div>
              <div className="application-card">
                <div className="app-icon">
                  <ManufacturingIcon />
                </div>
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
                <a href={DISCORD_CHANNEL} target="_blank" className="social-icon discord">
                  <span className="sr-only">Discord</span>
                </a>
                <a href={X_CHANNEL} target="_blank" className="social-icon x-twitter">
                  <span className="sr-only">X</span>
                </a>
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