// script.js

// Check if MetaMask is installed
// if (typeof window.ethereum !== 'undefined') {
//     const connectButton = document.getElementById('connectButton');

//     connectButton.addEventListener('click', async () => {
//       try {
//         // Request access to the user's MetaMask accounts
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

//         // Log the first account to the console
//         console.log('Connected account:', accounts[0]);

//         // Add your code here to handle the connected account
//         // For example, you could update your UI to show the connected account

//       } catch (error) {
//         console.error('Error connecting to MetaMask:', error);
//       }
//     });
//   } else {
//     console.error('MetaMask is not installed');
//   }



// const connectWallet = async () => {
//     try {
//       // Get the provider from web3Modal, which in our case is MetaMask
//       // When used for the first time, it prompts the user to connect their wallet
//       await getProviderOrSigner();
//       setWalletConnected(true);

//       checkIfAddressInWhitelist();
//       getNumberOfWhitelisted();
//     } catch (err) {
//       console.error(err);
//     }
//   };





// import MetaMaskOnboarding from '@metamask/onboarding';
// const onboarding = new MetaMaskOnboarding();

// const player = document.querySelector(".success-anim");
// const btn = document.querySelector(".onboard");
// const statusText = document.querySelector("h1");
// const statusDesc = document.querySelector(".desc");
// const loader = document.querySelector(".loader");
// const upArrow = document.querySelector(".up");
// const confetti = document.querySelector(".confetti");

// const isMetaMaskInstalled = () => {
//   const { ethereum } = window;
//   return Boolean(ethereum && ethereum.isMetaMask);
// };

// const onClickInstallMetaMask = () => {
//   onboarding.startOnboarding();
//   loader.style.display = 'block';
// }

// const connectWallet = async () => {
//   try {
//     return await ethereum.request({ method: "eth_accounts" });
//   } catch (error) {
//     console.error("Error connecting wallet:", error);
//     throw error; // Re-throw the error for error handling in the caller
//   }
// };

// const connected = (accounts) => {
//   statusText.innerHTML = "Connected!";
//   statusDesc.classList.add("account");
//   statusDesc.innerHTML = accounts[0];
//   btn.style.display = "none";
//   loader.style.display = "none";
//   upArrow.style.display = "none";
//   confetti.style.display = "block";
//   player.play();
//   statusDesc.classList.add("account");

// };

// const MetaMaskClientCheck = async () => {
//   if (!isMetaMaskInstalled()) {
//     statusText.innerText = "You need to Install a Wallet";
//     statusDesc.innerText = "We recommend the MetaMask wallet.";
//     btn.innerText = "Install MetaMask";
//     btn.onclick = onClickInstallMetaMask;
//   } else {
//     try {
//       const accounts = await connectWallet();
//       if (accounts && accounts[0]) {
//         connected(accounts);
//       } else {
//         statusText.innerHTML = "Connect your wallet";
//         statusDesc.innerHTML = "To begin, please connect your MetaMask wallet.";
//         btn.innerText = "Connect MetaMask";
//         upArrow.style.display = "block";
//       }
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//     }
//   }
// };

// btn.addEventListener("click", async () => {
//   btn.style.backgroundColor = "#cccccc";
//   loader.style.display = "block";

//   try {
//     const accounts = await ethereum.request({ method: "eth_requestAccounts" });
//     connected(accounts);
//   } catch (error) {
//     console.error("Error connecting wallet:", error);
//   }
// });

// MetaMaskClientCheck();






// import MetaMaskOnboarding from '@metamask/onboarding';

// // Get the button element by its id
// const button = document.getElementById('myButton');

// // Add an event listener to the button, listening for the 'click' event
// button.addEventListener('click', () => {
//     // Display a message using the alert function

//     const isMetaMaskInstalled = () => {
//         const { ethereum } = window;
//         return Boolean(ethereum && ethereum.isMetaMask);
//     };

//     button.addEventListener('click', () => {
//         if (isMetaMaskInstalled()) {
//             // MetaMask is installed, connect to wallet
//             connectWallet().then(accounts => {
//                 alert('Connected accounts:', accounts);
//                 // Add your code here to handle the connected accounts
//             }).catch(error => {
//                 alert('Error connecting wallet:', error);
//             });
//         } else {
//             // MetaMask is not installed, show a message or take appropriate action
//             alert('MetaMask is not installed');
//         }
//     });
    

// });



// Get the button element by its id
const button = document.getElementById('myButton');

// Add an event listener to the button, listening for the 'click' event
button.addEventListener('click', () => {
  // Display a message using the alert function
  alert('Button clicked!');
});
