import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";

function TokenPrivateSale() {
  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      
      <Header />

      <main className="main-content">
        <div className="content-container">
          {/* Hero Section */}
          <section className="hero-section" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              [Project Name] Token Private Sale
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'var(--text-secondary)',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              Join the future of [project focus] with our exclusive private sale opportunity
            </p>
            <button className="dimo-button">
              Participate Now
            </button>
          </section>

          {/* Tokenomics Section */}
          <section style={{ padding: '4rem 0' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '2rem',
              color: 'var(--text-primary)',
              textAlign: 'center'
            }}>
              Tokenomics
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              <div className="battery-card">
                <h3>Total Supply</h3>
                <p className="battery-count">1,000,000,000</p>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  [Token Symbol]
                </p>
              </div>
              
              <div className="battery-card">
                <h3>Private Sale Allocation</h3>
                <p className="battery-count">200,000,000</p>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  20% of total supply
                </p>
              </div>
              
              <div className="battery-card">
                <h3>Token Price</h3>
                <p className="battery-count">$0.05</p>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  Per [Token Symbol]
                </p>
              </div>
            </div>

            {/* Additional Tokenomics Details */}
            <div style={{ 
              marginTop: '3rem',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Distribution Breakdown</h3>
              <ul style={{ 
                listStyle: 'none',
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>Private Sale: 20%</li>
                <li>Public Sale: 30%</li>
                <li>Team: 15% (vested over 2 years)</li>
                <li>Ecosystem Development: 25%</li>
                <li>Marketing & Partnerships: 10%</li>
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="dimo-container" style={{ margin: '4rem auto' }}>
            <div>
              <h2 style={{ 
                color: 'var(--text-primary)', 
                marginBottom: '1rem' 
              }}>
                Join the Private Sale
              </h2>
              <p style={{ 
                color: 'var(--text-secondary)', 
                marginBottom: '1.5rem' 
              }}>
                Minimum investment: 0.5 ETH
              </p>
              <button className="dimo-button">
                Connect Wallet
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TokenPrivateSale;