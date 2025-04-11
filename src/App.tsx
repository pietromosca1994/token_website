import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ShareVehiclesWithDimo, useDimoAuthState } from '@dimo-network/login-with-dimo'
import { getAmountOfConnectedBatteries } from './utils'
import { DIMO_APP_CLIENT_ID } from './main.tsx';
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import SolanaWalletPage from './SolanaWalletPage'
import AboutUs from "./AboutUs"; 
import PrivacyPolicy from "./PrivacyPolicy"; 
import TermsAndConditions from "./TermsAndConditions"; 
import HowItWorks from "./HowItWorks"; 
import PrivateSale from "./TokenPrivateSale.tsx"; 
import Payments from "./Payments.tsx"; 
import GlobeVisualization from './components/GlobeVisualization'
import './App.css'
import './Header.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Custom DIMO Button that wraps the ShareVehiclesWithDimo component
function ConnectDimoButton({ onSuccess, onError }) {
  return (
    <ShareVehiclesWithDimo
      mode="popup"
      onSuccess={onSuccess}
      onError={onError}
      permissionTemplateId={"1"}
      expirationDate="2062-12-12T18:51:00Z"
      utm="utm_campaign=dimo"
      render={({ onClick }) => (
        <button className="connect-dimo-button" onClick={onClick}>
          Connect with DIMO
        </button>
      )}
    />
  );
}

function Home() {
  const navigate = useNavigate();
  const [batteryCount, setBatteryCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDimoSuccess = (authData) => {
    console.log("Success:", authData);
    navigate('/wallet');
  };

  const handleDimoError = (error) => {
    console.error("Error:", error);
  };

  useEffect(() => {
    const fetchBatteryCount = async () => {
      try {
        setIsLoading(true);
        const count = await getAmountOfConnectedBatteries(DIMO_APP_CLIENT_ID);
        setBatteryCount(count);
      } catch (error) {
        console.error("Failed to fetch battery count:", error);
        setBatteryCount(0); // Fallback value
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatteryCount();
  }, []);

  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      
      <Header />
      
      <main className="dashboard-content">
        <div className="connect-button-container">
          <ConnectDimoButton 
            onSuccess={handleDimoSuccess} 
            onError={handleDimoError} 
          />
        </div>
        
        <div className="battery-stats-container">
          <div className="battery-stats-content">
            <div className="stats-header">
              <h2>Network Statistics</h2>
              <p>Real-time monitoring of connected devices</p>
            </div>
            
            <div className="stats-cards">
              <div className="stat-card batteries">
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="7" y="2" width="10" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="6" x2="12" y2="10"/>
                    <line x1="12" y1="14" x2="12" y2="18"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>Batteries Connected</h3>
                  <div className="stat-value">
                    {isLoading ? (
                      <span className="loading-pulse">Loading...</span>
                    ) : (
                      <>{batteryCount}</>
                    )}
                  </div>
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

function App() {
  const {
    isAuthenticated,
    getValidJWT,
    email,
    walletAddress,
    getEmail
  } = useDimoAuthState();
  
  console.log({ isAuthenticated, getValidJWT, email, walletAddress, getEmail });

  return (
    <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={
            <SolanaWalletPage 
              email={email}
              walletAddress={walletAddress}
            />
          } />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/private-sale" element={<PrivateSale />} />
          {/* <Route path="/payments" element={<Payments />} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App