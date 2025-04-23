import { useEffect, useState } from 'react';
import axios from 'axios';
import './VehicleCardComponent.css';
import {Vehicle} from '../SolanaWalletPage'

const SolscanLogo = () => (
  <svg viewBox="0 0 24 24" className="solscan-logo">
    <path 
      fill="currentColor" 
      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,7H13V9H11V7M11,11H13V17H11V11Z" 
    />
  </svg>
);

interface NFTCoreData {
  tokenAddress?: string;
  attributes: Record<string, string>;
  properties: Record<string, string>;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const displayAttributes: { key: string; label: string }[] = [
  { key: 'Rated capacity [Ah]', label: 'Capacity [Ah]' },
  { key: 'Battery chemistry', label: 'Chemistry' },
  { key: 'Nominal voltage [V]', label: 'Nominal Voltage [V]' },
  { key: 'Certified usable battery energy [kWh]', label: 'Usable Energy [kWh]' },
];

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [nftCoreData, setNftCoreData] = useState<NFTCoreData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTCoreData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post('http://localhost:3000/api/getNFTCore', {
          name: 'Clarios',
        });
        if (response.status === 200 && response.data) {
          const data = response.data;
          setNftCoreData({
            tokenAddress: data.data?.publicKey,
            attributes: data.attributes || {},
            properties: data.properties || {},
          });
        } else {
          setError('Failed to fetch NFT data');
        }
      } catch (err) {
        console.error('Error fetching NFT core data:', err);
        setError('Error connecting to NFT service');
      } finally {
        setLoading(false);
      }
    };
    fetchNFTCoreData();
  }, [vehicle.id]);

  const getSolscanUrl = () => {
    return nftCoreData?.tokenAddress ? `https://solscan.io/token/${nftCoreData.tokenAddress}` : null;
  };

  return (
    <div className="vehicle-card">
      <div className="vehicle-image-container">
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="vehicle-image"
          onError={(e) => (e.currentTarget.src = "/api/placeholder/300/200")}
        />
        <span className="vehicle-id">ID: {vehicle.id}</span>
      </div>
      <div className="vehicle-details">
        <div className="vehicle-header">
          <h3 className="vehicle-title">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
        </div>
        <p className="vehicle-vin">VIN: {vehicle.id}</p>
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-text">Loading data...</span>
          </div>
        )}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {nftCoreData && !loading && !error && (
          <div className="specs-container">
            <h4 className="specs-title">Battery Specifications</h4>
            <div className="specs-grid">
              {displayAttributes.map(({ key, label }) =>
                nftCoreData.attributes[key] ? (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{label}:</span>
                    <span className="spec-value">{nftCoreData.attributes[key]}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
        {nftCoreData?.tokenAddress && (
          <div className="solscan-container">
            <a
              href={getSolscanUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="solscan-button"
            >
              <SolscanLogo />
              View on Solscan
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;