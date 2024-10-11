import './App.css'
import { Reclaim } from '@reclaimprotocol/js-sdk'
import { useState, useEffect } from 'react'
import QRCode from "react-qr-code";
import { ethers } from 'ethers';
import UserDashboard from './components/UserDashboard';
import ProtocolDashboard from './components/ProtocolDashboard';

function App() {

  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [userType, setUserType] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const [url, setUrl] = useState('')
  const APP_ID = "0x1D8170DcC668271a0BA0f04F59c1EB8B22b4124D" //TODO: replace with your applicationId
  const reclaimClient = new Reclaim.ProofRequest(APP_ID)


  async function generateVerificationRequest() {
    const providerId = 'f9f383fd-32d9-4c54-942f-5e9fda349762' //TODO: replace with your provider ids you had selected while creating the application

    reclaimClient.addContext(
      (`user's address`),
      ('for acmecorp.com on 1st january')
    )

    await reclaimClient.buildProofRequest(providerId)

    reclaimClient.setSignature(
      await reclaimClient.generateSignature( // this is an MVP, you should not generate the signature on the frontend
        '0xd2f9ca547f366afeed274ee77695cf0be5aa3674492cfb14539938c128b5c198' //TODO : replace with your APP_SECRET
      )
    )

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest()

    setUrl(requestUrl)

    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof)
        const data = proof.claimData.context.extractedParameters
        // Your business logic here
      },
      onFailureCallback: error => {
        console.error('Verification failed', error)
        // Your business logic here to handle the error
      }
    })
  }

  async function connectWallet() {
    if (!connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      // Disconnect the wallet
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setWalletAddress("");
      setUrl(''); // Clear the QR code when disconnecting
    }
  }
  return (
        <div className="app">
          <header className="app-header">
            <h1>Reclaim Verifier dApp</h1>
            <button className="connect-button" onClick={connectWallet}>
              {connected ? "Disconnect Wallet" : "Connect Wallet"}
            </button>
          </header>
         
          <main className="app-main">
            {connected && !userType && (
              <div className="user-type-selection">
                <h2>Are you a User or a Protocol?</h2>
                <div className="button-group">
                  <button className="user-type-button" onClick={() => setUserType('user')}>User</button>
                  <button className="user-type-button" onClick={() => setUserType('protocol')}>Protocol</button>
                </div>
              </div>
            )}
            {connected && userType === 'user' && (
              <UserDashboard
                walletAddress={walletAddress}
                contract={contract}
              />
            )}
            {connected && userType === 'protocol' && (
              <ProtocolDashboard
                walletAddress={walletAddress}
                contract={contract}
              />
            )}
          </main>
          <footer className="app-footer">
            <p>© 2024 Reclaim Verifier dApp. All rights reserved.</p>
          </footer>
        </div>
      );
  
    }
export default App