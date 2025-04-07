import { Link } from "react-router-dom";
import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./HowItWorks.css";

// import batteryImg from './assets/images/battery.jpg';

// How It Works Page
function HowItWorks() {
  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      
      <Header />
      
      <main className="main-content">
        <div className="content-container">
          <div className="hiw-container">
            <h1 className="hiw-title">How It Works</h1>
            <p className="hiw-subtitle">Revolutionizing battery management through blockchain technology</p>
            
            <div className="hiw-steps">
              {/* Step 1 */}
              <div className="hiw-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h2>Connect & Tokenize Your Battery</h2>
                  <div className="step-image-container">
                    {/* <img src={batteryImg} alt="Battery tokenization process" className="step-image" /> */}
                    <img src="/api/placeholder/600/350" alt="Battery tokenization process" className="step-image" />
                  </div>
                  <div className="step-description">
                    <p>Start by signing in using DIMO, our currently supported authentication service. This seamless connection does more than just create an account:</p>
                    
                    <ul className="hiw-list">
                      <li>
                        <span className="highlight">Battery Tokenization:</span> Upon registration, a unique Battery Token is minted as a digital representation of your physical battery.
                      </li>
                      <li>
                        <span className="highlight">EU Battery Passport Compliant:</span> Your token stores both static information (manufacturer, capacity, chemistry) and dynamic data (charge cycles, health status) according to EU Battery Passport standards.
                      </li>
                      <li>
                        <span className="highlight">Immutable Record:</span> All battery data is secured on the blockchain, creating a tamper-proof historical record of your battery's performance and condition.
                      </li>
                    </ul>
                    
                    <div className="tech-note">
                      <h4>Technical Benefits</h4>
                      <p>The tokenization process creates a digital twin of your battery on the blockchain, enabling verifiable ownership, transparent history tracking, and secure data sharing for analytics.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="hiw-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h2>Earn & Stake $EAGLE Tokens</h2>
                  <div className="step-image-container">
                    <img src="/api/placeholder/600/350" alt="Earning and staking tokens" className="step-image" />
                  </div>
                  <div className="step-description">
                    <p>Become an active participant in our community and be rewarded for your valuable contributions:</p>
                    
                    <ul className="hiw-list">
                      <li>
                        <span className="highlight">Data Sharing Rewards:</span> Earn $EAGLE tokens by contributing your battery telemetry data to the collective knowledge pool.
                      </li>
                      <li>
                        <span className="highlight">Community Engagement:</span> Receive additional tokens for participating in governance, providing feedback, and helping improve the ecosystem.
                      </li>
                      <li>
                        <span className="highlight">Staking Mechanism:</span> Stake your earned tokens to receive enhanced analytics, priority access to new features, and voting rights in the DAO.
                      </li>
                    </ul>
                    
                    <div className="rewards-panel">
                      <div className="reward-item">
                        <div className="reward-value">5-10</div>
                        <div className="reward-label">$EAGLE daily for active data sharing</div>
                      </div>
                      <div className="reward-item">
                        <div className="reward-value">2-5%</div>
                        <div className="reward-label">Annual yield from staking</div>
                      </div>
                      <div className="reward-item">
                        <div className="reward-value">+15%</div>
                        <div className="reward-label">Bonus for continuous participation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="hiw-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h2>Access Advanced Analytics & Insights</h2>
                  <div className="step-image-container">
                    <img src="/api/placeholder/600/350" alt="Advanced battery analytics" className="step-image" />
                  </div>
                  <div className="step-description">
                    <p>Leverage your $EAGLE tokens and the collective data pool to unlock powerful insights about your battery:</p>
                    
                    <ul className="hiw-list">
                      <li>
                        <span className="highlight">AI-Powered Predictions:</span> Access state-of-the-art ML/AI algorithms that analyze your battery's health, predict remaining useful life, and recommend optimal usage patterns.
                      </li>
                      <li>
                        <span className="highlight">Comparative Analysis:</span> See how your battery performs against similar models in the community, with anonymized aggregated data providing valuable benchmarks.
                      </li>
                      <li>
                        <span className="highlight">Customized Reports:</span> Receive detailed insights tailored to your specific usage patterns and battery model.
                      </li>
                    </ul>
                    
                    <div className="analytics-features">
                      <div className="feature">
                        <div className="feature-icon">⚡</div>
                        <div className="feature-name">Degradation Prediction</div>
                      </div>
                      <div className="feature">
                        <div className="feature-icon">📊</div>
                        <div className="feature-name">Performance Optimization</div>
                      </div>
                      <div className="feature">
                        <div className="feature-icon">🔄</div>
                        <div className="feature-name">Second Life Assessment</div>
                      </div>
                      <div className="feature">
                        <div className="feature-icon">💹</div>
                        <div className="feature-name">Value Estimation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hiw-cta-section">
              <h3>Ready to Join the Battery Revolution?</h3>
              <p>Connect your vehicle through DIMO today and become part of the sustainable future of battery management.</p>
              <Link to="/" className="hiw-cta-button">Get Started Now</Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default HowItWorks;