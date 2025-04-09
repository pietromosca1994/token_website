import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { Connection } from '@solana/web3.js'
import GlobeVisualization from './components/GlobeVisualization'
import { getVehiclesByDevLicenseAndOwner } from './utils'
import './SolanaWalletPage.css'
import './Header.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import { DIMO_APP_CLIENT_ID, QUICKNODE_ENDPOINT } from './main.tsx'
import { Footer } from './Footer.tsx'

// Define types for better type safety
interface Vehicle {
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
    <Link to="/">
      <h1 className="logo">EAGLE Labs.</h1>
    </Link>
    
    <div className="wallet-info">
      {publicKey && balance !== null && (
        <div className="balance-display">
          Balance: {balance !== null ? balance.toFixed(2) + " SOL" : "Fetching..."}
        </div>
      )}
      <WalletMultiButton className="wallet-connect-button" />
    </div>
  </header>
)

// Component for showing user auth info
const AuthInfo = ({ email, walletAddress }) => (
  <div className="auth-info">
    {email && <p>Email: {email}</p>}
    {walletAddress && <p className="wallet-address">DIMO Wallet Address: {walletAddress}</p>}
  </div>
)

// Component for a single vehicle card
const VehicleCard = ({ vehicle }) => (
  <div className="vehicle-card">
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
)

// Component for vehicle list section
const VehicleSection = ({ vehicles, loading, error }) => (
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
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <div className="no-vehicles">No vehicles found</div>
        )}
      </div>
    )}
  </div>
)

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
              name: 'Unnamed Vehicle',
              make: vehicle.definition?.make || 'Unknown',
              model: vehicle.definition?.model || 'Unknown Model',
              year: vehicle.definition?.year || null,
              vin: 'Unknown VIN',
              image: ipfsUrl || "https://via.placeholder.com/150" // Default image if none provided
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
      <main className="main-content">
        <div className="content-container">
          <AuthInfo email={email} walletAddress={walletAddress} />
          <VehicleSection vehicles={vehicles} loading={loading} error={error} />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}