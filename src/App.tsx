import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ShareVehiclesWithDimo, useDimoAuthState } from '@dimo-network/login-with-dimo'
import SolanaWalletPage from './SolanaWalletPage'
import GlobeVisualization from './components/GlobeVisualization'
import {getAmountOfConnectedBatteries} from './utils'
import { DIMO_APP_CLIENT_ID, QUICKNODE_ENDPOINT} from './main.tsx';
import './App.css'

function Header() {
  return (
    <header className="header">
      <h1 className="logo">EAGLE Labs.</h1>
      <button className="login-button">Login</button>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-sections">
          <section>
            <h4>Company</h4>
            <p>About Us</p>
            <p>Careers</p>
            <p>Press</p>
          </section>
          <section>
            <h4>Legal</h4>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </section>
          <section>
            <h4>Follow Us</h4>
            <p>Twitter</p>
            <p>LinkedIn</p>
            <p>GitHub</p>
          </section>
          <section>
            <h4>Contact</h4>
            <p>support@company.com</p>
            <p>+1 (555) 123-4567</p>
          </section>
        </div>
      </div>
    </footer>
  )
}

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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            Share Vehicles with DIMO
          </button>
        )}
      />
    </div>
  )
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
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="main-content">
        <div className="globe-background">
          <GlobeVisualization />
        </div>
        
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
      </div>
      
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
