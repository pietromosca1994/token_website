import axios from 'axios';
import {NonFungibleTokenMeta} from './api/types';

// load env variables (overwriting in case)
// require('dotenv').config({ override: true });

// fetch secrets
// export const DIMO_APP_CLIENT_ID = process.env.DIMO_APP_CLIENT_ID || 'my-dimo-app-client-id';
// export const QUICKNODE_API_KEY = process.env.QUICKNODE_API_KEY || 'my-quicknode-api-key';
// export const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || 'my-wallet-private-key';
export const DIMO_APP_CLIENT_ID = import.meta.env.VITE_DIMO_APP_CLIENT_ID;
export const QUICKNODE_API_KEY = import.meta.env.VITE_QUICKNODE_API_KEY;
export const WALLET_PRIVATE_KEY = import.meta.env.VITE_WALLET_PRIVATE_KEY;

// constants
export const EV_DATABASE_BASE_URL = 'http://localhost:5000/api'
export const FACTORY_BASE_URL = 'http://localhost:5000/api'; 

export async function getVehiclesByDevLicenseAndOwner(devLicense: string, onwer: string): Promise<any[]>{
    const GRAPHQL_URL = "https://identity-api.dimo.zone/query";
    const query = `
        query GetVehicleByDevLicense {
        vehicles(filterBy: { privileged: "${devLicense}", owner: "${onwer}"}, first: 100) {
            nodes {
            owner
            tokenId
            image
            name
            definition {
                make
                model
                year
            }
            }
        }
        }
    `;
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.vehicles.nodes;
}

export async function getAmountOfConnectedBatteries(devLicense: string): Promise<Number> {
    const GRAPHQL_URL = "https://identity-api.dimo.zone/query";
    const query = `
        query GetVehicleByDevLicense {
        vehicles(filterBy: { privileged: "${devLicense}"}, first: 100) {
            nodes {
            owner
            tokenId
            image
            name
            definition {
                make
                model
                year
            }
            }
        }
        }
    `;
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.vehicles.nodes.length;
}

interface VehicleInfoResponse {
  // Define fields based on actual API response, e.g.:
  // model: string;
  // range: number;
  // price: number;
  [key: string]: any;
}

export async function mintNFTCore(
    meta: NonFungibleTokenMeta 
): Promise<any> {
    const payload = {
        signer: WALLET_PRIVATE_KEY,
        payer: WALLET_PRIVATE_KEY,
        meta: meta
    };
    const url = `${FACTORY_BASE_URL}/mintNFTCore`;
    axios.post(url, payload)
    .then(response => {
        console.log('✅ NFT minted:', response.data);
    })
    .catch(error => {
        console.error('❌ Error minting NFT:', error.message || error);
    });
}
    
export async function getVehicleInfo(
    brand: string,
    model: string,
    year: string
): Promise<VehicleInfoResponse | null> {
    const payload = {
    brand: String(brand),
    model: String(model),
    year: String(year)
    };
    const url = `${EV_DATABASE_BASE_URL}/vehicle`;

    try {
        console.log("Fetching vehicle info with payload:", payload);
        const response = await axios.post<VehicleInfoResponse>(url, payload);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch vehicle info:", error);
        return null;
    }
}



