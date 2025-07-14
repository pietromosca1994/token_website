import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeDimoSDK, DimoAuthProvider } from '@dimo-network/login-with-dimo'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import './index.css'
import App from './App.tsx'

// load env variables (overwriting in case)
// require('dotenv').config({ override: true });

const wallets = [new PhantomWalletAdapter()]
const endpoint = clusterApiUrl('mainnet-beta')

// fetch secrets
// export const DIMO_APP_CLIENT_ID = process.env.DIMO_APP_CLIENT_ID || 'my-dimo-app-client-id';
// export const QUICKNODE_API_KEY = process.env.QUICKNODE_API_KEY || 'my-quicknode-api-key';
// export const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || 'my-wallet-private-key';

export const DIMO_APP_CLIENT_ID = import.meta.env.VITE_DIMO_APP_CLIENT_ID;
export const QUICKNODE_API_KEY = import.meta.env.VITE_QUICKNODE_API_KEY;
export const WALLET_PRIVATE_KEY = import.meta.env.VITE_WALLET_PRIVATE_KEY;

export const QUICKNODE_ENDPOINT = `https://light-floral-hill.solana-mainnet.quiknode.pro/${QUICKNODE_API_KEY}/`;

export const DISCORD_CHANNEL = "https://discord.gg/aDmTPDUsnj";
export const X_CHANNEL = "https://x.com/labs_eagle64585";

initializeDimoSDK({
  clientId: DIMO_APP_CLIENT_ID,
  redirectUri: 'http://localhost:5173',
  environment: 'production'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <DimoAuthProvider>
            <App />
          </DimoAuthProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </StrictMode>,
)
