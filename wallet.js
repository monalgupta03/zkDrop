// const connectButton = document.getElementById('connectButton');

// connectButton.addEventListener('click', async () => {
//     if (typeof window.ethereum !== 'undefined') {
//         console.log('MetaMask is installed!');

//         try {
//             // Request account access if needed
//             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

//             // Handle account(s)
//             alert('Wallet connected: ' + accounts[0]);
//             console.log('Connected account:', accounts[0]);

//             // Redirect to another page after the alert
//             window.location.href = 'WhoAreYou.html';



//         } catch (error) {
//             console.error('Error connecting MetaMask:', error);
//             alert('Error connecting MetaMask.');
//         }
//     } else {
//         alert('MetaMask is not installed. Please install it to connect.');
//     }
// });




const connectButton = document.getElementById('connectButton');

connectButton.addEventListener('click', async () => {
    // Check for MetaMask
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        try {
            // Request account access from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Handle MetaMask account(s)
            alert('MetaMask Wallet connected: ' + accounts[0]);
            console.log('Connected MetaMask account:', accounts[0]);

            // Redirect to another page after the alert
            window.location.href = 'WhoAreYou.html';

        } catch (error) {
            console.error('Error connecting MetaMask:', error);
            alert('Error connecting MetaMask.');
        }
    }
    // Check for Braavos
    else if (typeof window.braavos !== 'undefined') {
        console.log('Braavos is installed!');

        try {
            // Request account access from Braavos
            const accounts = await window.braavos.request({ method: 'eth_requestAccounts' });

            // Handle Braavos account(s)
            alert('Braavos Wallet connected: ' + accounts[0]);
            console.log('Connected Braavos account:', accounts[0]);

            // Redirect to another HTML page after the alert
            window.location.href = 'connected.html'; // Change to your desired HTML file
        } catch (error) {
            console.error('Error connecting Braavos:', error);
            alert('Error connecting Braavos.');
        }
    } else {
        alert('Neither MetaMask nor Braavos is installed. Please install one to connect.');
    }
});
