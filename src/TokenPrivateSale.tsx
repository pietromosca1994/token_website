import { Link } from "react-router-dom";
import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useState, useEffect } from "react";
import "./App.css";
import "./TokenPrivateSale.css";

// parameters 
const endDate = new Date('2025-12-31T23:59:59Z'); // Set your end date here
const progress = 0; // Example sale progress percentage
const tokenSalePrice = 0.000058; // Example token price in USD
const tokenTGEPrice = 0.00011764;
const discount = 50;
const minPurchase = 1000; // Example minimum purchase in USD
const maxPurchase = 100000; // Example maximum purchase in USD
const accept = ["BTC", "ETH", "SOL", "USDT", "USDC"]; // Accepted currencies
const platforms = ["Bitcoin", "Ethereum", "Solana", "SUI"]; // Supported platforms
const totalSupply = 85000000000; // Total supply of tokens
const initialCirculatingSupply = 12750000000; // Initial circulating supply
const initialMarketCap = 1500000; // Initial market cap in USD

// token allocation 
const tokenAllocation =[
  ["Private Sale", "11.35%", "private-sale"],
  ["Public Sale", "3.65%", "public-sale"],
  ["Ecosystem", "40%", "ecosystem"],
  ["Community", "15%", "community"],
  ["Team", "13%", "team"],
  ["Advisors", "5%", "advisors"],
  ["Investors", "5%", "investors"],
  ["Market", "5%", "market"],
  ["Aidrop", "2%", "airdrop"],
]

// veting schedule
const vestingSchedule = [
  // TGE Unlock, Cliff, Vesting
  ["Private Sale", "10%", "3 months", "12 months"],
  ["Public Sale", "10%", "3 months", "12 months"],
  ["Ecosystem", "10%", "0 months", "24 months"],
  ["Community", "5%", "6 months", "18 months"],
  ["Team", "0%", "6 months", "36 months"],
  ["Advisors", "0%", "6 months", "12 months"],
  ["Investors", "0%", "12 months", "24 months"],
  ["Market", "100%", "0 months", "0 months"],
  ["Aidrop", "100%", "0 months", "0 months"]
]

function PrivateSale() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [saleProgress, setSaleProgress] = useState(progress);

  useEffect(() => {
    // Sale end date (example: 2 weeks from now)
    // const endDate = new Date();
    // endDate.setDate(endDate.getDate() + 14);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="private-sale-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>

      <Header />

      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="gradient-text">$EAGLE Private Sale</h1>
            <p className="hero-subtitle">Soar to new heights with Eagle Labs</p>
            
            <div className="hero-cta">
              <Link to="/Payments" className="primary-button pulse-animation">Buy $EAGLE Now</Link>
            </div>
          </div>
        </section>

        {/* Main Grid Layout */}
        <div className="sale-content-grid">
          {/* Sale Info Card */}
          <section className="card sale-info-card">
            <h2 className="section-title">Private Sale</h2>

            <div className="countdown-container glass-effect">
              <div className="countdown-title">Sale Ends In:</div>
              <div className="countdown-timer">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="countdown-item">
                    <div className="countdown-value">{value}</div>
                    <div className="countdown-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sale-details">
              {[
                ["Token Price:", `${tokenSalePrice} USD`],
                ["Token Price at TGE:", `${tokenTGEPrice} USD`],
                ["Min. Purchase:", `${minPurchase} USD`],
                ["Max. Purchase:", `${maxPurchase} USD`],
                ["Accept:", `${accept}`],
                ["Platform:", `${platforms}`]
              ].map(([label, value], index) => (
                <div key={index} className="sale-detail-item">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
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
            {/* <button className="primary-button buy-button">
              Buy $EAGLE Now
            </button> */}
          </section>

          {/* Tokenomics Card */}
          <section className="card tokenomics-card">
            <h2 className="section-title">Tokenomics</h2>

            <div className="tokenomics-container">
              <div className="tokenomics-stats glass-effect">
                {[
                  ["Total Supply", `${totalSupply.toLocaleString()} EAGLE`],
                  ["Initial Circulating Supply", `${initialCirculatingSupply.toLocaleString()} EAGLE`],
                  ["Initial Market Cap", `${initialMarketCap.toLocaleString()} EAGLE`]
                ].map(([label, value], index) => (
                  <div key={index} className="tokenomics-stat-item">
                    <span className="stat-label">{label}</span>
                    <span className="stat-value">{value}</span>
                  </div>
                ))}
              </div>

              <div className="token-allocation glass-effect">
                <h3>Token Allocation</h3>
                <div className="allocation-chart">
                  {tokenAllocation.map(([label, percent, colorClass], index) => (
                    <div key={index} className="allocation-item" style={{ "--percent": percent }}>
                      <div className={`allocation-color ${colorClass}`}></div>
                      <div className="allocation-label">{label}</div>
                      <div className="allocation-percent">{percent}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="vesting-schedule glass-effect">
                <h3>Vesting Schedule</h3>
                <div className="vesting-table">
                  <div className="vesting-row header">
                    <div className="vesting-cell">Allocation</div>
                    <div className="vesting-cell">TGE Unlock</div>
                    <div className="vesting-cell">Cliff</div>
                    <div className="vesting-cell">Vesting</div>
                  </div>
                  {vestingSchedule.map(([allocation, tge, cliff, vesting], index) => (
                    <div key={index} className="vesting-row">
                      <div className="vesting-cell" data-label="Allocation">{allocation}</div>
                      <div className="vesting-cell" data-label="TGE Unlock">{tge}</div>
                      <div className="vesting-cell" data-label="Cliff">{cliff}</div>
                      <div className="vesting-cell" data-label="Vesting">{vesting}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title centered">Why Invest in $EAGLE?</h2>
          <div className="features-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Governance",
                description: "Participate in key protocol decisions through voting rights with $EAGLE tokens"
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Staking Rewards",
                description: "Earn passive income by staking your $EAGLE tokens in our dedicated staking pools"
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Exclusive Access",
                description: "Get early access to new features, products, and premium services in the Eagle Labs ecosystem"
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 16L12 14V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Reduced Fees",
                description: "Enjoy discounted transaction fees across the platform when using $EAGLE tokens"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card glass-effect">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="roadmap-section">
          <h2 className="section-title centered">Roadmap</h2>
          <div className="roadmap-timeline">
            {[
              {
                period: "Q2 2025",
                items: [
                  "Private Token Sale", 
                  "Initial Ecosystem Development", 
                  "Team Expansion"],
                active: true
              },
              {
                period: "Q3 2025",
                items: [
                  "Public Token Sale", 
                  "DEX Listings", 
                  "Staking Platform Launch"],
                active: false
              },
              {
                period: "Q4 2025",
                items: [
                  "Protocol Development",
                  "Partnerships", 
                  "Community Engagement"
                ],
                active: false
              },
              {
                period: "Q1 2026",
                items: [
                  "Protocol development",
                  "Cross-Chain Integration", 
                  "Partnerships Expansion", 
                  "Eagle Labs V2 Release"],
                active: false
              }
            ].map((phase, index) => (
              <div key={index} className={`roadmap-item ${phase.active ? "active" : ""}`}>
                <div className="roadmap-dot"></div>
                <div className="roadmap-content glass-effect">
                  <h3>{phase.period}</h3>
                  <ul>
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default PrivateSale;