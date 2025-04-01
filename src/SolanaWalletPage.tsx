import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import GlobeVisualization from './components/GlobeVisualization';
import {getVehiclesByDevLicenseAndOwner} from './utils'
import './SolanaWalletPage.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { DIMO_APP_CLIENT_ID, QUICKNODE_ENDPOINT} from './main.tsx';
import {Footer} from './footer.tsx'

interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  image: string;
}

interface SolanaWalletPageProps {
  email: string | null;
  walletAddress: string | null;
}



export default function SolanaWalletPage({ email, walletAddress }: SolanaWalletPageProps) {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connection] = useState(new Connection(QUICKNODE_ENDPOINT));

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / 1_000_000_000); // Convert lamports to SOL
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);
      try {
        const owner = walletAddress || '';
        const data = await getVehiclesByDevLicenseAndOwner(DIMO_APP_CLIENT_ID, owner);

        setVehicles(
          data.map((vehicle: any) => {
            const ipfsUrl = vehicle.image?.startsWith("ipfs://")
              ? vehicle.image.replace("ipfs://", "https://ipfs.io/ipfs/")
              : vehicle.image;

            return {
              id: vehicle.tokenId,
              name: 'Unnamed Vehicle',
              make: vehicle.definition?.make || 'Unknown',
              model: vehicle.definition?.model || 'Unknown Model',
              year: vehicle.definition?.year || null,
              vin: 'Unknown VIN',
              image: ipfsUrl || "https://via.placeholder.com/150" // Default image if none provided
            };
          })
        );
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setError('Failed to load vehicle data');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
    fetchVehicles();
  }, [publicKey, connection, walletAddress]);

  return (
    <div className="wallet-page">
      {/* // background */}
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      
      {/* // header component */}
      <header className="header">
        <div className="wallet-info">
          {publicKey && balance !== null && (
            <div className="balance-display">
              Balance: {balance !== null ? balance.toFixed(2) + " SOL" : "Fetching..."}
            </div>
          )}
        </div>
        
        <WalletMultiButton className="wallet-connect-button" />
      </header>
      
      {/* // main content */}
      <main className="main-content">
        <div className="content-container">
          <div className="auth-info">
          {email && <p>Email: {email}</p>}
          {walletAddress && <p>DIMO Wallet Address: {walletAddress}</p>}
        </div>

        <div className="vehicle-section">
          <h2 className="section-title">Connected Vehicles</h2>
          {loading ? (
            <div className="loading-message">Loading vehicles...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="vehicle-list">
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="vehicle-card">
                    <img 
                      src={vehicle.image} 
                      alt={`${vehicle.make} ${vehicle.model}`} 
                      className="vehicle-image"
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
                    />
                    <div className="vehicle-text">
                      <div className="vehicle-name">Token ID: {vehicle.id}</div>
                      <div className="vehicle-details">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No vehicles found</div>
              )}
            </div>
          )}
        </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
