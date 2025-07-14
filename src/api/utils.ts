import axios from 'axios';
import {NonFungibleTokenMeta, DimoVehicle, EVDatabaseBattery, Property, Attribute} from './types';
import {WALLET_PRIVATE_KEY} from './index'

// constants
export const EV_DATABASE_BASE_URL = 'http://localhost:5000/api'
export const FACTORY_BASE_URL = 'http://localhost:3000/api'; 

export async function getVehiclesByDevLicense(devLicense: string): Promise<DimoVehicle[]>{
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
    return data.data.vehicles.nodes as DimoVehicle[];
}

export async function getVehiclesByDevLicenseAndOwner(devLicense: string, onwer: string): Promise<DimoVehicle[]>{
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
    return data.data.vehicles.nodes as DimoVehicle[];
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

export async function mintNFTCore(
    meta: NonFungibleTokenMeta 
): Promise<any> {
    const payload = {
        signer: WALLET_PRIVATE_KEY,
        payer: WALLET_PRIVATE_KEY,
        meta: meta
    };
    
    try {
        console.log("Minting NFT with meta:", meta);
        const url = `${FACTORY_BASE_URL}/mintNFTCore`;
        const response = await axios.post(url, payload)
        console.log("✅ NFT minted successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Failed to mint NFT:", error);
        return null;
    }
}

export async function getNFTCore(
    name: String 
): Promise<any> {
    try {
        console.log("Getting NFT with name:", name);
        const url = `${FACTORY_BASE_URL}/getNFTCore`;
        const payload = {
            'name': name,
        }
        const response = await axios.post(url, payload)
        console.log("✅ Got NFT successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Failed to get NFT:", error);
        return null;
    }
}
    
export async function getBatteryInfo(brand: string, model: string, year: string): Promise<EVDatabaseBattery | null> {
    const payload = {
    brand: String(brand),
    model: String(model),
    year: String(year)
    };
    const url = `${EV_DATABASE_BASE_URL}/vehicle`;

    try {
        console.log("Fetching vehicle info with payload:", payload);
        const response = await axios.post(url, payload);
        return response.data.data as EVDatabaseBattery;
    } catch (error) {
        console.error("❌ Failed to fetch vehicle info:", error);
        return null;
    }
}

export async function mintDimoBatteryNFTCore(vehicle: DimoVehicle): Promise<any> {
    //TODO perform these actions only if the token is not already minted
    const name = `DIMO_vehicle_${vehicle.tokenId}`
    const nft = await getNFTCore(name);

    if (nft == null) {

        const batteryMeta= await getBatteryInfo(vehicle.definition.make, 
                                                vehicle.definition.model, 
                                                vehicle.definition.year);
    
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
            return response
        }   
        else{
            console.error("❌ The vehicle is not an Electrc Vehicle or battery information is not available");
            return null;
        }
    }
    else{
        console.error("❌ The NFT for this vehicle already exists");
        return null
    }
}


