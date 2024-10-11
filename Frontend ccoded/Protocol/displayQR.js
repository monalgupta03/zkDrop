

//App.js file

// import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import QRCode from "react-qr-code";
import { Reclaim } from '@reclaimprotocol/js-sdk';

function App() {
    // State variables for wallet connection status and address
    const [connected, setConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [url, setUrl] = useState('');

    const APP_ID = "0xF8A0d97cc0630f2e551bcc70572c1c5eB869c876" //TODO: replace with your applicationId
    const reclaimClient = new Reclaim.ProofRequest(APP_ID)

    async function generateVerificationRequest() {
        const providerId = 'f9f383fd-32d9-4c54-942f-5e9fda349762' //TODO: replace with your provider ids you had selected while creating the application
        4
        reclaimClient.addContext(
            (`user's address`),
            ('for acmecorp.com on 1st january')
        )

        await reclaimClient.buildProofRequest(providerId)

        reclaimClient.setSignature(
            await reclaimClient.generateSignature( // this is an MVP, you should not generate the signature on the frontend
                '0x0ae9133f8854bb1c5a7c93ce10e3baeff6efb0189dbb3ece3c3ab6df26446b3b' //TODO : replace with your APP_SECRET
            )
        )

        const { requestUrl, statusUrl } =
            await reclaimClient.createVerificationRequest()

        setUrl(requestUrl)

        await reclaimClient.startSession({
            onSuccessCallback: proofs => {
                console.log('Verification success', proofs)
                // Your business logic here
            },
            onFailureCallback: error => {
                console.error('Verification failed', error)
                // Your business logic here to handle the error
            }
        })
    }
    // Function to connect/disconnect the wallet
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
        }
    }


    return (
        <div className="user-dashboard">
            <h2>User Dashboard</h2>
            <p>Wallet Address: {walletAddress}</p>
            {qrUrl && (
                <div>
                    <h3>Scan QR Code to generate proof:</h3>
                    <QRCode value={qrUrl} />
                </div>
            )}
            {proofStatus && <p>{proofStatus}</p>}
        </div>
    );
}



const button = document.getElementById('QRgen');

button.addEventListener('click', () => {
    alert("reached!!")
    App();
}); 