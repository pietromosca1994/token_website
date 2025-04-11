import { Link } from "react-router-dom";
import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./HowItWorks.css";

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
            <h1 className="hiw-title">Battery Token Ecosystem</h1>
            <p className="hiw-subtitle">Secure, transparent, and sustainable battery management on the blockchain</p>
            
            <div className="token-hero">
              <div className="token-hero-content">
                <h2 className="token-hero-title">Revolutionizing Battery Management</h2>
                <p className="token-hero-text">
                  Our blockchain-based Battery Passport creates a secure digital twin of your battery,
                  fully compliant with EU Battery Passport regulations while unlocking new value for battery owners.
                </p>
                <Link to="/" className="token-hero-button">Connect Your Battery</Link>
              </div>
              <div className="token-hero-visual">
                <div className="token-hero-image-container">
                  <img src="/src/assets/images/ecosystem.jpg" alt="Battery token visualization" className="token-hero-image" />
                  <div className="token-hero-glow"></div>
                </div>
              </div>
            </div>
            
            <div className="token-workflow">
              <h2 className="section-title">How The Token Works</h2>
              <div className="workflow-steps">
                <div className="workflow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Authenticate</h3>
                    <p>Connect your battery with DIMO's secure authentication system</p>
                  </div>
                </div>
                <div className="workflow-connector">
                  <svg viewBox="0 0 50 24" className="connector-svg">
                    <path d="M0 12 L42 12" stroke="#646cff" strokeWidth="2" />
                    <path d="M42 5 L49 12 L42 19" stroke="#646cff" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className="workflow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Tokenize</h3>
                    <p>Your battery becomes a dynamic NFT on the blockchain</p>
                  </div>
                </div>
                <div className="workflow-connector">
                  <svg viewBox="0 0 50 24" className="connector-svg">
                    <path d="M0 12 L42 12" stroke="#646cff" strokeWidth="2" />
                    <path d="M42 5 L49 12 L42 19" stroke="#646cff" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className="workflow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Leverage</h3>
                    <p>Stake, spend, and optimize your tokenized battery asset</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="token-features">
              {/* Feature 1 */}
              <div className="token-feature tokenize-feature">
                <div className="feature-icon-container">
                  <div className="feature-visual tokenize-visual">
                    <svg viewBox="0 0 120 120" className="feature-svg">
                      <defs>
                        <linearGradient id="tokenizeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#646cff" />
                          <stop offset="100%" stopColor="#4248d9" />
                        </linearGradient>
                        <filter id="tokenizeGlow">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <rect x="25" y="25" width="30" height="30" rx="4" fill="url(#tokenizeGradient)" filter="url(#tokenizeGlow)" />
                      <rect x="65" y="65" width="30" height="30" rx="4" fill="url(#tokenizeGradient)" filter="url(#tokenizeGlow)" />
                      <path d="M45 40 L75 80" stroke="#646cff" strokeWidth="3" strokeDasharray="5,5" />
                      <circle cx="60" cy="60" r="40" stroke="#646cff" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                    </svg>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Dynamic Battery Tokenization</h3>
                  <p>Your battery becomes a dynamic NFT on the blockchain through DIMO integration, storing both immutable data (manufacturer specs, origin) and mutable data (usage patterns, health metrics), all compliant with EU Battery Passport regulations.</p>
                  
                  <div className="feature-details">
                    <div className="feature-image-container">
                      <img src="/src/assets/images/tokenization.png" alt="Tokenization process" className="feature-image" />
                      <div className="feature-highlight">EU COMPLIANT</div>
                    </div>
                    
                    <div className="data-types">
                      <div className="data-type immutable">
                        <div className="data-type-header">
                          <div className="data-type-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                              <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="none" stroke="#646cff" strokeWidth="2" />
                              <path d="M9 12h6" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                              <path d="M12 9v6" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <h4>Immutable Data</h4>
                        </div>
                        <ul>
                          <li>Manufacturer Details</li>
                          <li>Serial Number</li>
                          <li>Production Date</li>
                          <li>Material Composition</li>
                        </ul>
                      </div>
                      
                      <div className="data-type mutable">
                        <div className="data-type-header">
                          <div className="data-type-icon">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                              <path d="M12 2v4" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                              <path d="M12 18v4" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                              <path d="M4.93 4.93l2.83 2.83" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                              <path d="M16.24 16.24l2.83 2.83" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                              <path d="M2 12h4" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                              <path d="M18 12h4" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                              <path d="M4.93 19.07l2.83-2.83" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                              <path d="M16.24 7.76l2.83-2.83" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <h4>Mutable Data</h4>
                        </div>
                        <ul>
                          <li>Performance Metrics</li>
                          <li>Charge Cycles</li>
                          <li>Health Status</li>
                          <li>Usage Patterns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="token-feature stake-feature">
                <div className="feature-icon-container">
                  <div className="feature-visual stake-visual">
                    <svg viewBox="0 0 120 120" className="feature-svg">
                      <defs>
                        <linearGradient id="stakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#646cff" />
                          <stop offset="100%" stopColor="#4248d9" />
                        </linearGradient>
                        <filter id="stakeGlow">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <circle cx="60" cy="60" r="40" stroke="#646cff" strokeWidth="2" fill="none" />
                      <path d="M60 20 L60 100" stroke="#646cff" strokeWidth="2" />
                      <path d="M30 50 L90 70" stroke="#646cff" strokeWidth="2" />
                      <path d="M30 70 L90 50" stroke="#646cff" strokeWidth="2" />
                      <circle cx="60" cy="60" r="15" fill="url(#stakeGradient)" filter="url(#stakeGlow)" />
                      <circle cx="60" cy="60" r="8" fill="#1a1f36" />
                    </svg>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Stake & Earn</h3>
                  <p>Stake your battery tokens to earn passive rewards while contributing to the ecosystem. Staking unlocks premium features and builds community value through collective battery intelligence.</p>
                  
                  <div className="staking-container">
                    <div className="feature-image-container">
                      <img src="/src/assets/images/token_staking.jpg" alt="Token staking" className="feature-image" />
                    </div>
                    
                    <div className="staking-benefits">
                      <div className="staking-stats">
                        <div className="stat-item">
                          <div className="stat-value">5-15%</div>
                          <div className="stat-label">Annual yield</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">30 days</div>
                          <div className="stat-label">Minimum lock</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">5 min</div>
                          <div className="stat-label">Setup time</div>
                        </div>
                      </div>
                      
                      <div className="staking-tiers">
                        <h4>Staking Tiers</h4>
                        <div className="tier bronze">
                          <div className="tier-name">Bronze</div>
                          <div className="tier-amount">50 tokens</div>
                        </div>
                        <div className="tier silver">
                          <div className="tier-name">Silver</div>
                          <div className="tier-amount">200 tokens</div>
                        </div>
                        <div className="tier gold">
                          <div className="tier-name">Gold</div>
                          <div className="tier-amount">500 tokens</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="token-feature analyze-feature">
                <div className="feature-icon-container">
                  <div className="feature-visual analyze-visual">
                    <svg viewBox="0 0 120 120" className="feature-svg">
                      <defs>
                        <linearGradient id="analyzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#646cff" />
                          <stop offset="100%" stopColor="#4248d9" />
                        </linearGradient>
                        <filter id="analyzeGlow">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <path d="M30 80 L50 40 L70 60 L90 30" stroke="url(#analyzeGradient)" strokeWidth="3" fill="none" filter="url(#analyzeGlow)" />
                      <circle cx="30" cy="80" r="4" fill="url(#analyzeGradient)" />
                      <circle cx="50" cy="40" r="4" fill="url(#analyzeGradient)" />
                      <circle cx="70" cy="60" r="4" fill="url(#analyzeGradient)" />
                      <circle cx="90" cy="30" r="4" fill="url(#analyzeGradient)" />
                      <line x1="20" y1="90" x2="100" y2="90" stroke="#646cff" strokeWidth="2" />
                      <line x1="20" y1="90" x2="20" y2="20" stroke="#646cff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>ML-Powered Analytics</h3>
                  <p>Spend tokens to access our advanced machine learning analytics that deliver deep insights into your battery's performance. Our algorithms analyze patterns from thousands of batteries to provide you with personalized intelligence.</p>
                  
                  <div className="analytics-dashboard">
                    <div className="analytics-preview">
                      <div className="analytics-item">
                        <div className="analytics-icon">
                          <svg viewBox="0 0 24 24" width="32" height="32">
                            <path d="M12 2v20" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M2 12h20" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="12" cy="12" r="10" stroke="#646cff" strokeWidth="2" fill="none" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="url(#analyzeGradient)" strokeWidth="2" />
                          </svg>
                        </div>
                        <img src="/src/assets/images/analytics.jpg" alt="Health prediction" className="analytics-image" />
                        <h4>Predictive Health</h4>
                        <p>Forecast remaining useful life with 94% accuracy</p>
                      </div>
                      
                      <div className="analytics-item">
                        <div className="analytics-icon">
                          <svg viewBox="0 0 24 24" width="32" height="32">
                            <path d="M4 19h16" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 15h16" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 11h16" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 7h16" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M9 19v-4l-2 2" stroke="url(#analyzeGradient)" strokeWidth="2" strokeLinecap="round" />
                            <path d="M14 11V7l2 2" stroke="url(#analyzeGradient)" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <img src="/src/assets/images/optimization.jpg" alt="Usage optimization" className="analytics-image" />
                        <h4>Usage Optimization</h4>
                        <p>Increase battery efficiency by up to 25%</p>
                      </div>
                      
                      <div className="analytics-item">
                        <div className="analytics-icon">
                          <svg viewBox="0 0 24 24" width="32" height="32">
                            <circle cx="12" cy="12" r="10" stroke="#646cff" strokeWidth="2" fill="none" />
                            <path d="M12 8v4l3 3" stroke="url(#analyzeGradient)" strokeWidth="2" strokeLinecap="round" />
                            <path d="M7 4l2 2" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M15 4l-2 2" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <img src="/src/assets/images/analytics.jpg" alt="Historical tracking" className="analytics-image" />
                        <h4>Historical Tracking</h4>
                        <p>View performance over lifetime with detailed metrics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="token-feature optimize-feature">
                <div className="feature-icon-container">
                  <div className="feature-visual optimize-visual">
                    <svg viewBox="0 0 120 120" className="feature-svg">
                      <defs>
                        <linearGradient id="optimizeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#646cff" />
                          <stop offset="100%" stopColor="#4248d9" />
                        </linearGradient>
                        <filter id="optimizeGlow">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <rect x="35" y="35" width="50" height="50" rx="10" fill="none" stroke="#646cff" strokeWidth="2" />
                      <rect x="45" y="45" width="30" height="30" rx="5" fill="url(#optimizeGradient)" filter="url(#optimizeGlow)" />
                      <path d="M38 30 L82 30" stroke="#646cff" strokeWidth="2" />
                      <path d="M38 90 L82 90" stroke="#646cff" strokeWidth="2" />
                      <path d="M30 38 L30 82" stroke="#646cff" strokeWidth="2" />
                      <path d="M90 38 L90 82" stroke="#646cff" strokeWidth="2" />
                      <path d="M60 20 L60 35" stroke="#646cff" strokeWidth="2" />
                      <path d="M60 85 L60 100" stroke="#646cff" strokeWidth="2" />
                      <path d="M20 60 L35 60" stroke="#646cff" strokeWidth="2" />
                      <path d="M85 60 L100 60" stroke="#646cff" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="feature-content">
                  <h3>Smart Recommendations</h3>
                  <p>Spend tokens to receive personalized recommendations that extend your battery's lifespan. Our system leverages collective data intelligence from thousands of similar batteries to provide tailored guidance for your specific battery model and usage pattern.</p>
                  
                  <div className="recommendations-container">
                    <div className="recommendations-preview">
                      <div className="recommendation-card">
                        <div className="recommendation-icon">
                          <svg viewBox="0 0 40 40" className="recommendation-svg">
                            <rect x="10" y="8" width="20" height="30" rx="2" fill="none" stroke="#646cff" strokeWidth="1.5" />
                            <rect x="14" y="12" width="12" height="22" rx="1" fill="#646cff" fillOpacity="0.3" />
                            <path d="M17 6 L23 6" stroke="#646cff" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                        <h4>Charging Optimization</h4>
                        <p>Personalized charging schedules based on your usage patterns</p>
                        <div className="recommendation-benefit">+15% lifespan</div>
                      </div>
                      
                      <div className="recommendation-card">
                        <div className="recommendation-icon">
                          <svg viewBox="0 0 40 40" className="recommendation-svg">
                            <circle cx="20" cy="20" r="16" fill="none" stroke="#646cff" strokeWidth="1.5" />
                            <path d="M20 8 L20 20 L28 24" stroke="#646cff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M8 20 L12 20" stroke="#646cff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M28 20 L32 20" stroke="#646cff" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                        <h4>Temperature Management</h4>
                        <p>Real-time alerts for optimal temperature conditions</p>
                        <div className="recommendation-benefit">+20% efficiency</div>
                      </div>
                      
                      <div className="recommendation-card">
                        <div className="recommendation-icon">
                          <svg viewBox="0 0 40 40" className="recommendation-svg">
                            <polygon points="20,4 4,36 36,36" fill="none" stroke="#646cff" strokeWidth="1.5" />
                            <line x1="20" y1="16" x2="20" y2="24" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="20" cy="30" r="2" fill="#646cff" />
                          </svg>
                        </div>
                        <h4>Issue Detection</h4>
                        <p>Early warnings for potential issues before they cause damage</p>
                        <div className="recommendation-benefit">-40% failures</div>
                      </div>
                    </div>
                    
                    <div className="ai-assistant">
                      <div className="ai-assistant-header">
                        <svg viewBox="0 0 24 24" width="28" height="28">
                          <circle cx="12" cy="12" r="10" stroke="#646cff" strokeWidth="2" fill="none" />
                          <circle cx="12" cy="12" r="4" fill="url(#optimizeGradient)" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="url(#optimizeGradient)" strokeWidth="2" />
                        </svg>
                        <h4>AI Battery Assistant</h4>
                      </div>
                      <p>Get personalized advice from our AI assistant powered by your battery's data and collective intelligence from our network.</p>
                      {/* <div className="ai-assistant-button">Ask Battery AI</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="token-benefits">
              <h2 className="section-title">Benefits At A Glance</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="#646cff" strokeWidth="2" />
                      <path d="M8 11l3 3 5-5" stroke="url(#analyzeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>EU Compliant</h3>
                  <p>Meet all regulatory requirements with comprehensive Battery Passport</p>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                      <circle cx="12" cy="12" r="10" stroke="#646cff" strokeWidth="2" fill="none" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.5 0 1-.05 1.5-.13" stroke="url(#analyzeGradient)" strokeWidth="2" />
                      <path d="M12 8v4l3 3" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3>Extended Life</h3>
                  <p>Increase battery lifespan by up to 40% with smart recommendations</p>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                      <path d="M12 3v18" stroke="#646cff" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 8l-5-5-5 5" stroke="#646cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17 16l-5 5-5-5" stroke="#646cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 12h18" stroke="url(#analyzeGradient)" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 7l-5 5 5 5" stroke="url(#analyzeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 7l5 5-5 5" stroke="url(#analyzeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Data Portability</h3>
                  <p>Your battery data is yours, portable, and secure across systems</p>
                </div>
                
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                      <path d="M20 6L9 17l-5-5" stroke="#646cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="url(#analyzeGradient)" strokeWidth="2" />
                    </svg>
                  </div>
                  <h3>Verified Quality</h3>
                  <p>Transparent proof of battery quality and maintenance history</p>
                </div>
              </div>
            </div>
            
            <div className="hiw-cta-section">
              <div className="cta-particles"></div>
              <h2>Join the Battery Revolution</h2>
              <p>Connect your battery today and unlock its full potential in our ecosystem</p>
              <div className="cta-buttons">
                {/* <Link to="/" className="hiw-cta-button">Connect Battery <span>→</span></Link> */}
                <Link to="/about-us" className="hiw-secondary-button">Learn More</Link>
              </div>
              <div className="cta-stats">
                <div className="cta-stat">
                  {/* <div className="cta-stat-value">10,500+</div>
                  <div className="cta-stat-label">Batteries Connected</div> */}
                </div>
                <div className="cta-stat">
                  <div className="cta-stat-value">35%</div>
                  <div className="cta-stat-label">Average Lifespan Increase</div>
                </div>
                <div className="cta-stat">
                  <div className="cta-stat-value">100%</div>
                  <div className="cta-stat-label">EU Compliance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default HowItWorks;