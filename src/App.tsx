import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ShareVehiclesWithDimo, useDimoAuthState } from '@dimo-network/login-with-dimo'
import {getAmountOfConnectedBatteries} from './utils'
import { DIMO_APP_CLIENT_ID, QUICKNODE_ENDPOINT} from './main.tsx';
import {Footer} from './Footer.tsx'
import {Header} from './Header.tsx'
import SolanaWalletPage from './SolanaWalletPage'
import AboutUs from "./AboutUs"; 
import PrivacyPolicy from "./PrivacyPolicy"; 
import TermsAndConditions from "./TermsAndConditions"; 
import HowItWorks from "./HowItWorks"; 
import GlobeVisualization from './components/GlobeVisualization'
import './App.css'
import './Header.css';

// Custom DIMO Button that wraps the ShareVehiclesWithDimo component
function CustomDimoButton({ onSuccess, onError }) {
  // This is a styled button that will trigger the DIMO component
  return (
    <div className="dimo-container">
      <ShareVehiclesWithDimo
        mode="popup"
        onSuccess={onSuccess}
        onError={onError}
        permissionTemplateId={"1"}
        expirationDate="2062-12-12T18:51:00Z"
        utm="utm_campaign=dimo"
        render={({ onClick }) => (
          <button className="dimo-button" onClick={onClick}>
            Share Vehicles with DIMO
          </button>
        )}
      />
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [batteryCount, setBatteryCount] = useState(null);

  const handleDimoSuccess = (authData: any) => {
    console.log("Success:", authData);
    navigate('/wallet');
  };

  const handleDimoError = (error: any) => {
    console.error("Error:", error);
  };

  useEffect(() => {
    const fetchBatteryCount = async () => {
      try {
        const count = await getAmountOfConnectedBatteries(DIMO_APP_CLIENT_ID); // Assuming DIMO_APP_CLIENT_ID is available
        setBatteryCount(count); // Set the fetched battery count in state
      } catch (error) {
        console.error("Failed to fetch battery count:", error);
      }
    };

    fetchBatteryCount(); // Call the async function to fetch data
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="main-page">
      <div className="globe-background">
          <GlobeVisualization />
      </div>
      
      <Header />
      
      <main className="main-content">
        <div className="content-container">
          <div className="cards-stack">
            <CustomDimoButton 
              onSuccess={handleDimoSuccess} 
              onError={handleDimoError} 
            />
            <div className="battery-card">
              <h3>Batteries Connected</h3>
              <div className="battery-count">
                {batteryCount === null ? 'Loading...' : batteryCount} {/* Show loading until battery count is fetched */}
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
        <Route path ="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path ="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
