// load env variables (overwriting in case)
// import dotenv from 'dotenv';
// dotenv.config({ 
//     override: true,
//     // path: 'C:/Users/pmosca/Desktop/repos/token_website/.env'
//     path: '.env'
// });


// fetch secrets
export const DIMO_APP_CLIENT_ID = import.meta.env.VITE_DIMO_APP_CLIENT_ID;
export const QUICKNODE_API_KEY = import.meta.env.VITE_QUICKNODE_API_KEY;
export const WALLET_PRIVATE_KEY = import.meta.env.VITE_WALLET_PRIVATE_KEY;
