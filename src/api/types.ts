import { PublicKey} from "@solana/web3.js";

export enum SolanaNetwork {
    MainnetBeta = "https://api.mainnet-beta.solana.com",
    Devnet = "https://api.devnet.solana.com",
    Localnet = "http://127.0.0.1:8899",
}

export interface Configs {
    solanaNetwork: string
}

export class Attribute {
    trait_type: string;
    value: string | null;

    constructor(trait_type: string, value: string | null) {
        this.trait_type = trait_type;
        this.value = value;
    }
}

export class Property {
    key: string;
    value: string | null;

    constructor(key: string, value: string | null) {
        this.key = key;
        this.value = value;
    }
}

export class NonFungibleTokenMeta {
    name: string;
    symbol: string;
    uri: string;
    description: string;
    attributes: Attribute[];
    properties: Property[];

    constructor(props: {
        name: string;
        symbol: string;
        uri: string;
        description: string;
        attributes: Attribute[];
        properties: Property[];
    }) {
        this.name = props.name;
        this.symbol = props.symbol;
        this.uri = props.uri;
        this.description = props.description;
        this.attributes = props.attributes;
        this.properties = props.properties;
    }
    hasAttribute(traitType: string): boolean {
        return this.attributes.some(attr => attr.trait_type === traitType);
    }
    hasProperty(key: string): boolean {
        return this.properties.some(property => property.key === key);
    }
}

const ATTRIBUTES=[
    new Attribute('f6.1.2.1', null), // Battery passport identifier
    new Attribute('f6.1.2.2', null), // Battery identifier
    new Attribute('f6.1.2.4', null), // Manufacturer identifier and information
    new Attribute('f6.1.3.5', null), // Battery category (— LMT battery; — electric vehicle battery; or — industrial battery (stationary battery energy storage system/other industrial batteries))
    new Attribute('f6.1.3.6', null), // Battery mass
    new Attribute('f6.1.3.7', null), // Battery status
    new Attribute('f6.1.5.2', null), // Battery chemistry
    new Attribute('f6.1.5.4', null), // Materials used in cathode, anode and electrolyte
    new Attribute('f6.7.2.2', null), // Rated Capacity
    new Attribute('f6.7.2.4', null), // Capacity Fade
    new Attribute('f6.7.2.5', null), // Certified usable battery energy
    new Attribute('f6.7.2.9', null), // Minimum voltage
    new Attribute('f6.7.2.10', null), // Maximum voltage
    new Attribute('f6.7.2.11', null), // Nominal voltage
    // others
]

const PROPERTIES=[
    new Property('f6.7.2.3', null), // Remaining capacity
    new Property('f6.7.2.8', null), // State of Charge (SoC)
    // others
]

export class BatteryNonFungibleTokenMeta extends NonFungibleTokenMeta {
    constructor(props: {
        name: string;
        symbol: string;
        uri: string;
        description: string;
        attributes: Attribute[];
        properties: Property[];
        schemaVersion?: string;
    }) {
        super(props);
        this.attributes = props.attributes || ATTRIBUTES;
        this.properties = props.properties || PROPERTIES;

        // // Run validation on required attributes
        // const requiredAttributes = [
        //     "SoH", 
        //     "SoC", 
        //     "cyc"
        // ];
        // const missingAttributes = requiredAttributes.filter(attr => !this.hasAttribute(attr));
        // if (missingAttributes.length > 0) {
        //     throw new Error(`Missing required attributes: ${missingAttributes.join(", ")}`);
        // }

        // // Run validation on required properties
        // const requiredProperties = [
        //     "SoH", 
        //     "SoC", 
        //     "cyc"
        // ];
        // const missingProperties = requiredProperties.filter(attr => !this.hasAttribute(attr));
        // if (missingProperties.length > 0) {
        //     throw new Error(`Missing required property: ${missingProperties.join(", ")}`);
        // }
    }
}

export class Whitelist {
    authorized_users: PublicKey[];
  
    constructor(fields: { authorized_users: PublicKey[] }) {
      this.authorized_users = fields.authorized_users;
    }
  
    static schema = new Map([
      [
        Whitelist,
        {
          kind: "struct",
          fields: [["authorized_users", [32]]], // Array of 32-byte public keys
        },
      ],
    ]);
}

export interface DimoVehicle {
    owner: string,
    tokenId: string,
    image: string,
    name:string,
    definition: {
        make: string,
        model: string,
        year: string
    }
}

export interface EVDatabaseBattery {
    model_url_ev_database: string;
    model_name: string;
    brand: string;
    min_year: number;
    max_year: number;
    battery_capacity_kWh: number;
    battery_usable_kWh: number;
    battery_type: string;
    battery_voltage_V: number;
    battery_weight_kg: number;
    battery_number_of_cells: number;
    battery_architecture_V: number;
    battery_cathode_material: string;
    battery_name_reference: string;
    model_url_ev_specifications: string;
}