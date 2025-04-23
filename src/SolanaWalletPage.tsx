import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { Connection } from '@solana/web3.js'
import GlobeVisualization from './components/GlobeVisualization'
import { getVehiclesByDevLicenseAndOwner } from './utils'
import "./App.css";
import './SolanaWalletPage.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import { Copy, ChevronRight, Mail, Wallet } from 'lucide-react'

import { DIMO_APP_CLIENT_ID, QUICKNODE_ENDPOINT } from './main.tsx'
import { Footer } from './Footer.tsx'
import VehicleCard from './components/VehicleCardComponent.tsx'

// Define types for better type safety
export interface Vehicle {
  id: string
  name: string
  make: string
  model: string
  year: number
  vin: string
  image: string
}

interface SolanaWalletPageProps {
  email: string | null
  walletAddress: string | null
}

// Component for header
const Header = ({ balance, publicKey }) => (
  <header className="header">
    <Link to="/" className="logo-link">
      <h1 className="logo">EAGLE Labs.</h1>
    </Link>
    
    <div className="wallet-info">
      {publicKey && balance !== null && (
        <div className="balance-display">
          <div className="balance-indicator"></div>
          <span>{balance.toFixed(2)} SOL</span>
        </div>
      )}
      <WalletMultiButton className="wallet-connect-button" />
    </div>
  </header>
)

// Component for showing user auth info
const AuthInfo = ({ email, walletAddress }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    }
  };

  if (!email && !walletAddress) return null;

  return (
    <div className="auth-card">
      <h2 className="auth-title">Account Information</h2>
      
      <div className="auth-content">
        {email && (
          <div className="auth-item">
            <div className="auth-item-icon">
              <Mail size={18} />
            </div>
            <div className="auth-item-info">
              <span className="auth-label">Email Address</span>
              <span className="auth-value">{email}</span>
            </div>
          </div>
        )}
        
        {walletAddress && (
          <div className="auth-item">
            <div className="auth-item-icon">
              <Wallet size={18} />
            </div>
            <div className="auth-item-info">
              <span className="auth-label">DIMO Wallet</span>
              <div className="wallet-address-wrapper">
                <span className="auth-value wallet-address">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
                <span className="full-address">{walletAddress}</span>
                <button
                  onClick={handleCopy}
                  aria-label={copied ? "Copied!" : "Copy wallet address"}
                  className={`copy-button ${copied ? 'copied' : ''}`}
                >
                  {copied ? (
                    <span className="copied-check">✔</span>
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Component for vehicle list section
const VehicleSection = ({ vehicles, loading, error }) => (
  <section className="vehicle-section">
    <div className="section-header">
      <h2>Connected Vehicles</h2>
    </div>

    {loading ? (
      <div className="status-message loading">
        <div className="loading-spinner"></div>
        <span>Loading vehicles...</span>
      </div>
    ) : error ? (
      <div className="status-message error">
        <span>{error}</span>
      </div>
    ) : (
      <div className="vehicle-grid">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    )}
  </section>
);

// Main component
export default function SolanaWalletPage({ email, walletAddress }: SolanaWalletPageProps) {
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [connection] = useState(new Connection(QUICKNODE_ENDPOINT))

  // Custom hook for data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Fetch balance
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey)
          setBalance(balance / 1_000_000_000) // Convert lamports to SOL
        } catch (error) {
          console.error('Error fetching balance:', error)
        }
      }

      // Fetch vehicles
      setLoading(true)
      setError(null)
      try {
        const owner = walletAddress || ''
        const data = await getVehiclesByDevLicenseAndOwner(DIMO_APP_CLIENT_ID, owner)

        setVehicles(
          data.map((vehicle: any) => {
            const ipfsUrl = vehicle.image?.startsWith("ipfs://")
              ? vehicle.image.replace("ipfs://", "https://ipfs.io/ipfs/")
              : vehicle.image

            return {
              id: vehicle.tokenId,
              name: vehicle.name || 'Unnamed Vehicle',
              make: vehicle.definition?.make || 'Unknown',
              model: vehicle.definition?.model || 'Unknown Model',
              year: vehicle.definition?.year || null,
              vin: vehicle.vin || 'Unknown VIN',
              image: ipfsUrl || "https://via.placeholder.com/150"
            }
          })
        )
      } catch (error) {
        console.error('Error fetching vehicles:', error)
        setError('Failed to load vehicle data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [publicKey, connection, walletAddress])

  return (
    <div className="wallet-page">
      {/* Background */}
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      
      {/* Header with wallet info */}
      <Header balance={balance} publicKey={publicKey} />
      
      {/* Main content */}
      <main className="dashboard-content">
        <div className="dashboard-container">
          <div className="dashboard-layout">
            {/* Auth info section */}
            <AuthInfo email={email} walletAddress={walletAddress} />
            
            {/* Vehicle section */}
            <VehicleSection vehicles={vehicles} loading={loading} error={error} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}