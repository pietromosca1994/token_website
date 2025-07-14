import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Battery, Zap } from 'lucide-react';
import {getNFTCore, getBatteryInfo, mintNFTCore} from './api/utils';
import {DIMO_APP_CLIENT_ID} from './api/index';
import {NonFungibleTokenMeta, DimoVehicle, Property, Attribute} from './api/types';
import { getVehiclesByDevLicenseAndOwner } from './utils'  

interface UserInfoProps {
  email: string | null;
  walletAddress: string | null;
}

interface MintingStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  description: string;
}

const Loading = ({ email, walletAddress }: UserInfoProps) => {
  const [currentStep, setCurrentStep] = useState<'checking' | 'minting' | 'redirecting'>('checking');
  const [mintingSteps, setMintingSteps] = useState<MintingStep[]>([
    {
      id: 'battery-info',
      label: 'Fetching Battery Information',
      status: 'pending',
      description: 'Retrieving battery specifications and metadata'
    },
    {
      id: 'mint-nft',
      label: 'Minting Battery NFT',
      status: 'pending',
      description: 'Creating your unique battery passport NFT'
    }
  ]);
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateStepStatus = (stepId: string, status: MintingStep['status']) => {
    setMintingSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ));
  };

  const mintDimoBatteryNFTCore = async (vehicle: DimoVehicle): Promise<any> => {
    const name = `DIMO_vehicle_${vehicle.tokenId}`;
    // const nft = await getNFTCore(name);
    const nft = null;
    
    if (nft == null) {
      updateStepStatus('battery-info', 'processing');
      const batteryMeta = await getBatteryInfo(vehicle.definition.make, vehicle.definition.model, String(vehicle.definition.year));
      if (batteryMeta !== null) {
        // make the meta
        // attributes 
        const attributes = [
            // new Attribute('f6.1.2.1', null), // Battery passport identifier
            // new Attribute('f6.1.2.2', null), // Battery identifier
            new Attribute('f6.1.2.4', String(batteryMeta.battery_name_reference)), // Manufacturer identifier and information
            new Attribute('f6.1.3.5', 'electric vehicle battery'), // Battery category (— LMT battery; — electric vehicle battery; or — industrial battery (stationary battery energy storage system/other industrial batteries))
            new Attribute('f6.1.3.6', String(batteryMeta.battery_weight_kg)), // Battery mass
            // new Attribute('f6.1.3.7', null), // Battery status
            // new Attribute('f6.1.5.2', null), // Battery chemistry
            // new Attribute('f6.1.5.4', null), // Materials used in cathode, anode and electrolyte
            // new Attribute('f6.7.2.2', null), // Rated Capacity
            // new Attribute('f6.7.2.4', null), // Capacity Fade
            new Attribute('f6.7.2.5', String(batteryMeta.battery_capacity_kWh)), // Certified usable battery energy
            // new Attribute('f6.7.2.9', null), // Minimum voltage
            // new Attribute('f6.7.2.10', null), // Maximum voltage
            new Attribute('f6.7.2.11', String(batteryMeta.battery_voltage_V)), // Nominal voltage
            // others
        ]

        // properties
        const properties = [
            new Property('f6.7.2.3', String(batteryMeta.battery_capacity_kWh)), // Remaining capacity
            // new Property('f6.7.2.8', null), // State of Charge (SoC)
            // others
        ]
        const meta = new NonFungibleTokenMeta({
            name: name,
            symbol: 'DIMOVehicle',
            uri: 'https://example.com/battery/metadata.json',
            description: `Battery NFT for DIMO vehicle id ${vehicle.tokenId}`,
            attributes: attributes,
            properties: properties
        })
        
        // mint the NFT
        const response = await mintNFTCore(meta)
        updateStepStatus('mint-nft', 'completed');
        return response;
      } else {
        updateStepStatus('battery-info', 'error');
        throw new Error("The vehicle is not an Electric Vehicle or battery information is not available");
      }
    } else {
      throw new Error("The NFT for this vehicle already exists");
    }
  };

  const handleRedirect = () => {
    // Simulate redirect to ./wallet
    setCurrentStep('redirecting');
    setTimeout(() => {
      window.location.href = './wallet';
    }, 2000);
  };

  useEffect(() => {
    const processVehicles = async () => {
      try {
        if (!walletAddress) {
          setError('Wallet address not found');
          return;
        }

        const owner = walletAddress || '';
        const vehicles = await getVehiclesByDevLicenseAndOwner(DIMO_APP_CLIENT_ID, owner);
        
        if (vehicles.length === 0) {
          setError('No vehicles found for this wallet');
          return;
        }

        // Check if token already exists
        const vehicle = vehicles[0]; // Process first vehicle for demo
        const name = `DIMO_vehicle_${vehicle.tokenId}`;
        // const existingNFT = await getNFTCore(name);
        const existingNFT = null; // Simulate no existing NFT for demo
        
        if (existingNFT) {
          // Token exists, redirect immediately
          handleRedirect();
        } else {
          // Token doesn't exist, start minting process
          setCurrentStep('minting');
          await mintDimoBatteryNFTCore(vehicle);
          handleRedirect();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsProcessing(false);
      }
    };

    processVehicles();
  }, [walletAddress]);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  );

  const StepIndicator = ({ step }: { step: MintingStep }) => {
    const getIcon = () => {
      switch (step.status) {
        case 'completed':
          return <CheckCircle className="w-6 h-6 text-green-400" />;
        case 'processing':
          return <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>;
        case 'error':
          return <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-sm">!</div>;
        default:
          return <Clock className="w-6 h-6 text-gray-400" />;
      }
    };

    const getTextColor = () => {
      switch (step.status) {
        case 'completed':
          return 'text-green-400';
        case 'processing':
          return 'text-blue-400';
        case 'error':
          return 'text-red-400';
        default:
          return 'text-gray-400';
      }
    };

    return (
      <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
        {getIcon()}
        <div className="flex-1">
          <h3 className={`font-medium ${getTextColor()}`}>{step.label}</h3>
          <p className="text-sm text-gray-400">{step.description}</p>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = './wallet'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Continue to Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {currentStep === 'checking' && <Zap className="w-8 h-8 text-white" />}
            {currentStep === 'minting' && <Battery className="w-8 h-8 text-white" />}
            {currentStep === 'redirecting' && <CheckCircle className="w-8 h-8 text-white" />}
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            {currentStep === 'checking' && 'Checking Token Status'}
            {currentStep === 'minting' && 'Creating Battery NFT'}
            {currentStep === 'redirecting' && 'Redirecting to Wallet'}
          </h2>
          <p className="text-gray-400">
            {email && `Signed in as: ${email}`}
          </p>
        </div>

        {currentStep === 'checking' && (
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-gray-400 mt-4">Verifying your vehicle tokens...</p>
          </div>
        )}

        {currentStep === 'minting' && (
          <div className="space-y-4">
            {mintingSteps.map(step => (
              <StepIndicator key={step.id} step={step} />
            ))}
          </div>
        )}

        {currentStep === 'redirecting' && (
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-gray-400 mt-4">Taking you to your wallet...</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Battery className="w-4 h-4" />
            <span>DIMO Battery Passport</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;