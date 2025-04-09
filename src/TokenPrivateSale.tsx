import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./TokenPrivateSale.css";
import { useState, useEffect } from "react";

// Eagle Private Sale Page
function PrivateSale() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [saleProgress, setSaleProgress] = useState(68);

  useEffect(() => {
    // Sale end date (example: 2 weeks from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>

      <Header />

      <div className="main-content">
        <div className="sale-hero">
          <div className="sale-title-container">
            <h1 className="sale-title">$EAGLE Private Sale</h1>
            <p className="sale-subtitle">
              Soar to new heights with Eagle Labs
            </p>
          </div>
        </div>

        <div className="sale-grid">
          <section className="sale-section sale-info">
            <h2>Private Sale</h2>

            <div className="countdown-container">
              <div className="countdown-title">Sale Ends In:</div>
              <div className="countdown-timer">
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.days}</div>
                  <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.hours}</div>
                  <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.minutes}</div>
                  <div className="countdown-label">Mins</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.seconds}</div>
                  <div className="countdown-label">Secs</div>
                </div>
              </div>
            </div>

            <div className="sale-details">
              <div className="sale-detail-item">
                <span>Token Price:</span>
                <span>$0.08 USD</span>
              </div>
              <div className="sale-detail-item">
                <span>Min. Purchase:</span>
                <span>250 USD</span>
              </div>
              <div className="sale-detail-item">
                <span>Max. Purchase:</span>
                <span>25,000 USD</span>
              </div>
              <div className="sale-detail-item">
                <span>Accept:</span>
                <span>USDT, USDC, ETH</span>
              </div>
              <div className="sale-detail-item">
                <span>Platform:</span>
                <span>Ethereum</span>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-info">
                <span>Sale Progress</span>
                <span>{saleProgress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${saleProgress}%` }}
                ></div>
              </div>
              <div className="progress-stats">
                <span>Raised: $3,400,000 / $5,000,000</span>
              </div>
            </div>

            <button className="dimo-button buy-button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M15 12H12V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12H16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Buy $EAGLE Now
            </button>
          </section>

          <section className="sale-section tokenomics">
            <h2>Tokenomics</h2>

            <div className="tokenomics-container">
              <div className="tokenomics-stats">
                <div className="tokenomics-stat-item">
                  <span className="stat-label">Total Supply</span>
                  <span className="stat-value">100,000,000 $EAGLE</span>
                </div>
                <div className="tokenomics-stat-item">
                  <span className="stat-label">Initial Circulating Supply</span>
                  <span className="stat-value">12,500,000 $EAGLE</span>
                </div>
                <div className="tokenomics-stat-item">
                  <span className="stat-label">Initial Market Cap</span>
                  <span className="stat-value">$1,000,000 USD</span>
                </div>
              </div>

              <div className="token-allocation">
                <h3>Token Allocation</h3>
                <div className="allocation-chart">
                  <div
                    className="allocation-item"
                    style={{ "--percent": "20%" }}
                  >
                    <div className="allocation-color private-sale"></div>
                    <div className="allocation-label">Private Sale</div>
                    <div className="allocation-percent">20%</div>
                  </div>
                  <div
                    className="allocation-item"
                    style={{ "--percent": "15%" }}
                  >
                    <div className="allocation-color public-sale"></div>
                    <div className="allocation-label">Public Sale</div>
                    <div className="allocation-percent">15%</div>
                  </div>
                  <div
                    className="allocation-item"
                    style={{ "--percent": "25%" }}
                  >
                    <div className="allocation-color ecosystem"></div>
                    <div className="allocation-label">Ecosystem</div>
                    <div className="allocation-percent">25%</div>
                  </div>
                  <div
                    className="allocation-item"
                    style={{ "--percent": "20%" }}
                  >
                    <div className="allocation-color team"></div>
                    <div className="allocation-label">Team</div>
                    <div className="allocation-percent">20%</div>
                  </div>
                  <div
                    className="allocation-item"
                    style={{ "--percent": "10%" }}
                  >
                    <div className="allocation-color marketing"></div>
                    <div className="allocation-label">Marketing</div>
                    <div className="allocation-percent">10%</div>
                  </div>
                  <div
                    className="allocation-item"
                    style={{ "--percent": "10%" }}
                  >
                    <div className="allocation-color reserves"></div>
                    <div className="allocation-label">Reserves</div>
                    <div className="allocation-percent">10%</div>
                  </div>
                </div>
              </div>

              <div className="vesting-schedule">
                <h3>Vesting Schedule</h3>
                <div className="vesting-table">
                  <div className="vesting-row header">
                    <div className="vesting-cell">Allocation</div>
                    <div className="vesting-cell">TGE Unlock</div>
                    <div className="vesting-cell">Cliff</div>
                    <div className="vesting-cell">Vesting</div>
                  </div>
                  <div className="vesting-row">
                    <div className="vesting-cell">Private Sale</div>
                    <div className="vesting-cell">10%</div>
                    <div className="vesting-cell">1 month</div>
                    <div className="vesting-cell">12 months</div>
                  </div>
                  <div className="vesting-row">
                    <div className="vesting-cell">Public Sale</div>
                    <div className="vesting-cell">25%</div>
                    <div className="vesting-cell">None</div>
                    <div className="vesting-cell">6 months</div>
                  </div>
                  <div className="vesting-row">
                    <div className="vesting-cell">Team</div>
                    <div className="vesting-cell">0%</div>
                    <div className="vesting-cell">6 months</div>
                    <div className="vesting-cell">24 months</div>
                  </div>
                  <div className="vesting-row">
                    <div className="vesting-cell">Ecosystem</div>
                    <div className="vesting-cell">5%</div>
                    <div className="vesting-cell">3 months</div>
                    <div className="vesting-cell">36 months</div>
                  </div>
                  <div className="vesting-row">
                    <div className="vesting-cell">Marketing</div>
                    <div className="vesting-cell">15%</div>
                    <div className="vesting-cell">None</div>
                    <div className="vesting-cell">18 months</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="eagle-features">
          <h2>Why Invest in $EAGLE?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 14L12 10L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Governance</h3>
              <p>
                Participate in key protocol decisions through voting rights with
                $EAGLE tokens
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 11L12 14L22 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Staking Rewards</h3>
              <p>
                Earn passive income by staking your $EAGLE tokens in our
                dedicated staking pools
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Exclusive Access</h3>
              <p>
                Get early access to new features, products, and premium
                services in the Eagle Labs ecosystem
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 16L12 14V8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Reduced Fees</h3>
              <p>
                Enjoy discounted transaction fees across the platform when
                using $EAGLE tokens
              </p>
            </div>
          </div>
        </section>

        <section className="roadmap-section">
          <h2>Roadmap</h2>
          <div className="roadmap-timeline">
            <div className="roadmap-item active">
              <div className="roadmap-dot"></div>
              <div className="roadmap-content">
                <h3>Q2 2025</h3>
                <ul>
                  <li>Private Token Sale</li>
                  <li>Initial Ecosystem Development</li>
                  <li>Team Expansion</li>
                </ul>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-dot"></div>
              <div className="roadmap-content">
                <h3>Q3 2025</h3>
                <ul>
                  <li>Public Token Sale</li>
                  <li>DEX Listings</li>
                  <li>Staking Platform Launch</li>
                </ul>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-dot"></div>
              <div className="roadmap-content">
                <h3>Q4 2025</h3>
                <ul>
                  <li>CEX Listings</li>
                  <li>Governance Portal</li>
                  <li>Mobile App Beta</li>
                </ul>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-dot"></div>
              <div className="roadmap-content">
                <h3>Q1 2026</h3>
                <ul>
                  <li>Cross-Chain Integration</li>
                  <li>Partnerships Expansion</li>
                  <li>Eagle Labs V2 Release</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default PrivateSale;