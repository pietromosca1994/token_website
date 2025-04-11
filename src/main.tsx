import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeDimoSDK, DimoAuthProvider } from '@dimo-network/login-with-dimo'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import './index.css'
import App from './App.tsx'

const wallets = [new PhantomWalletAdapter()]
const endpoint = clusterApiUrl('mainnet-beta')

export const DIMO_APP_CLIENT_ID = '0x14C21aB21F1F186455B718B8629b9Ed5394A660a';
export const QUICKNODE_ENDPOINT = 'https://light-floral-hill.solana-mainnet.quiknode.pro/2fd29795b25622ac9ecb92459cc49638f86a7c88/';
export const DISCORD_CHANNEL = "https://discord.gg/aDmTPDUsnj";
export const X_CHANNEL = "";

initializeDimoSDK({
  clientId: '0x14C21aB21F1F186455B718B8629b9Ed5394A660a',
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
