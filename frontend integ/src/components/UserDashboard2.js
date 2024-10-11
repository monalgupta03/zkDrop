import './UserDashboard.css';
import React, { useState, useEffect } from 'react';
import { Reclaim } from '@reclaimprotocol/js-sdk';
import QRCode from "react-qr-code";
import { ethers } from 'ethers';

function UserDashboard({ walletAddress, contract }) {
  const [connected, setConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [setWalletAddress] = useState("");
  const [url, setUrl] = useState('')
  const APP_ID = "0x1D8170DcC668271a0BA0f04F59c1EB8B22b4124D" //TODO: replace with your applicationId
  const reclaimClient = new Reclaim.ProofRequest(APP_ID)
  const [isEligible, setIsEligible] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [providers, setProviders] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isProofGenerated, setIsProofGenerated] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProviders();
  }, [contract]);

  async function fetchProviders() {
    if (contract) {
      try {
        const providerList = await contract.getProviders();
        if (Array.isArray(providerList)) {
          setProviders(providerList);
        } else {
          console.error("Providers is not an array:", providerList);
          setError("Failed to fetch providers. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
        setError("Failed to fetch providers. Please try again later.");
      }
    }
  }

  async function proveClaimForProvider(provider) {
    setSelectedProvider(provider);
    const providerId = provider.id; // Assuming each provider has an 'id' field

    try {
      reclaimClient.addContext(
        (`user's address: ${walletAddress}`),
        (`for provider: ${provider.name}`)
      );

      await reclaimClient.buildProofRequest(providerId);

      reclaimClient.setSignature(
        await reclaimClient.generateSignature(
          'YOUR_RECLAIM_APP_SECRET' // Replace with your Reclaim APP_SECRET
        )
      );

      const { requestUrl } = await reclaimClient.createVerificationRequest();

      setQrCodeUrl(requestUrl);

      await reclaimClient.startSession({
        onSuccessCallback: async (proof) => {
          console.log('Verification success', proof);
          await storeProofOnChain(proof, provider.id);
          setIsProofGenerated(true);
        },
        onFailureCallback: (error) => {
          console.error('Verification failed', error);
          setError('Verification failed. Please try again.');
        }
      });
    } catch (error) {
      console.error("Error in proveClaimForProvider:", error);
      setError('Failed to initiate proof. Please try again.');
    }
  }

  async function storeProofOnChain(proof, providerId) {
    if (contract) {
      try {
        // Assuming the contract has a function to store the proof
        const tx = await contract.storeProof(providerId, JSON.stringify(proof));
        await tx.wait();
        alert('Proof stored on the RSK blockchain successfully!');
      } catch (error) {
        console.error("Error storing proof on chain:", error);
        setError('Failed to store proof on the blockchain. Please try again.');
      }
    }
  }

  if (error) {
    return (
      <div className="user-dashboard error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <p>Wallet Address: {walletAddress}</p>
      
      <h3>Available Providers</h3>
      {providers.length > 0 ? (
        <ul>
          {providers.map((provider, index) => (
            <li key={index}>
              {provider.name}
              <button onClick={() => proveClaimForProvider(provider)}>Prove Claim</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No providers available at the moment.</p>
      )}

      {qrCodeUrl && (
        <div className="qr-section">
          <h3>Scan QR Code to Prove Claim for {selectedProvider?.name}</h3>
          <QRCode value={qrCodeUrl} />
        </div>
      )}

      {isProofGenerated && (
        <div className="proof-status">
          <p>Proof generated and stored on RSK blockchain successfully!</p>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;