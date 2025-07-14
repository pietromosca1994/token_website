import _ from 'lodash';
import {getBatteryInfo, mintNFTCore, getVehiclesByDevLicense, getAmountOfConnectedBatteries, mintDimoBatteryNFTCore, getNFTCore} from '../src/api/utils';
import {NonFungibleTokenMeta, DimoVehicle} from '../src/api/types';
import { DIMO_APP_CLIENT_ID } from '../src/api/index';

// const vehicle= await getBatteryInfo('Tesla', 'Model 3', '2019');
// console.log(vehicle)

// const meta = new NonFungibleTokenMeta({
//     name: 'Test NFT',
//     symbol: 'TNFT',
//     uri: 'https://example.com/nft/metadata.json',
//     description: 'This is a test NFT for development purposes',
//     attributes: [
//         { trait_type: 'Color', value: 'Red' },
//         { trait_type: 'Size', value: 'Large' }
//     ],
//     properties: [
//         { key: 'Creator', value: 'Dimo Labs' },
//         { key: 'License', value: 'CC0' }
//     ]
// });

// const response = await mintNFTCore(meta)
// console.log('Minted NFT response:', response); 

// const response= await getVehiclesByDevLicense(DIMO_APP_CLIENT_ID)
// console.log(response)

const response = await mintDimoBatteryNFTCore({
    owner: 'owner_address',
    tokenId: '1234',
    image: 'image_url',
    name:'test_vehicle',
    definition: {
        make: 'Tesla',
        model: 'Model 3',
        year: '2019'
    }
})
console.log(response)

// const response = await getNFTCore('DIMO_vehicle_12345')
// console.log(response)