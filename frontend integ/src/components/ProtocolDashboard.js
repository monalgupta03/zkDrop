// // frontend/src/components/ProtocolDashboard.js
// import React, { useState, useEffect } from 'react';
// import { getAllUserAddresses, getUserProofIds } from '../utils/contractInteraction';
// import { verifyProofs } from '../utils/reclaimSDK';

// const ProtocolDashboard = ({ signer }) => {
//   const [users, setUsers] = useState([]);
//   const [isVerifying, setIsVerifying] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const addresses = await getAllUserAddresses(signer);
//       const usersWithProofs = await Promise.all(addresses.map(async (address) => {
//         const proofIds = await getUserProofIds(signer, address);
//         return { address, proofIds };
//       }));
//       setUsers(usersWithProofs);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleVerifyProofs = async (user) => {
//     setIsVerifying(true);
//     try {
//       const verificationResults = await verifyProofs(user.proofIds);
//       console.log(`Verification results for ${user.address}:`, verificationResults);
//       setIsVerifying(false);
//       alert('Proofs verified!');
//     } catch (error) {
//       console.error('Error verifying proofs:', error);
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Protocol Dashboard</h2>
//       <h3>Users and Their Proofs:</h3>
//       <ul>
//         {users.map((user) => (
//           <li key={user.address}>
//             Address: {user.address}
//             <button onClick={() => handleVerifyProofs(user)} disabled={isVerifying}>
//               {isVerifying ? 'Verifying...' : 'Verify Proofs'}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProtocolDashboard;

// import React, { useState, useEffect } from 'react';

// function ProtocolDashboard({ walletAddress, verifyUser, checkAirdropEligibility, contract }) {
//   const [users, setUsers] = useState([]);
//   const [verificationStatus, setVerificationStatus] = useState({});
//   const [airdropStatus, setAirdropStatus] = useState({});

//   useEffect(() => {
//     // Fetch users who have submitted proofs from the smart contract
//     const fetchUsers = async () => {
//       if (contract) {
//         const userList = await contract.getUsers();
//         setUsers(userList);
//       }
//     };
//     fetchUsers();
//   }, [contract]);

//   async function handleVerifyUser(userId, providerId) {
//     setVerificationStatus(prev => ({ ...prev, [userId]: 'Verifying...' }));
//     const result = await verifyUser(userId, providerId);
//     setVerificationStatus(prev => ({ ...prev, [userId]: result ? 'Verified' : 'Failed' }));
    
//     if (result) {
//       const eligible = await checkAirdropEligibility(userId);
//       setAirdropStatus(prev => ({ ...prev, [userId]: eligible ? 'Eligible' : 'Not Eligible' }));
//     }
//   }

//   return (
//     <div className="protocol-dashboard">
//       <h2>Protocol Dashboard</h2>
//       <p>Wallet Address: {walletAddress}</p>
//       <h3>Users with Submitted Proofs:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>User Address</th>
//             <th>Provider</th>
//             <th>Action</th>
//             <th>Verification Status</th>
//             <th>Airdrop Eligibility</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.address}</td>
//               <td>{user.provider}</td>
//               <td>
//                 <button onClick={() => handleVerifyUser(user.id, user.providerId)}>
//                   Verify
//                 </button>
//               </td>
//               <td>{verificationStatus[user.id] || 'Not Verified'}</td>
//               <td>{airdropStatus[user.id] || 'Not Checked'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ProtocolDashboard;

// import React from 'react';

// function ProtocolDashboard({ walletAddress, users, verifyUser, verificationStatus, airdropStatus }) {
//   const [users, setUsers] = useState([]);
//   const [verificationStatus, setVerificationStatus] = useState({});
//   const [airdropStatus, setAirdropStatus] = useState({});

//   useEffect(() => {
//     // Fetch users who have submitted proofs from the smart contract
//     const fetchUsers = async () => {
//       if (contract) {
//         const userList = await contract.getUsers();
//         setUsers(userList);
//       }
//     };
//     fetchUsers();
//   }, [contract]);

//   async function handleVerifyUser(userId, providerId) {
//     setVerificationStatus(prev => ({ ...prev, [userId]: 'Verifying...' }));
//     const result = await verifyUser(userId, providerId);
//     setVerificationStatus(prev => ({ ...prev, [userId]: result ? 'Verified' : 'Failed' }));
    
//     if (result) {
//       const eligible = await checkAirdropEligibility(userId);
//       setAirdropStatus(prev => ({ ...prev, [userId]: eligible ? 'Eligible' : 'Not Eligible' }));
//     }
//   }
//   return (
//     <div className="protocol-dashboard">
//       <h2>Protocol Dashboard</h2>
//       <p>Wallet Address: {walletAddress}</p>
//       <h3>Users with Submitted Proofs:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>User Address</th>
//             <th>Provider</th>
//             <th>Action</th>
//             <th>Verification Status</th>
//             <th>Airdrop Eligibility</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.address}</td>
//               <td>{user.provider}</td>
//               <td>
//                 <button onClick={() => verifyUser(user.id, user.providerId)}>
//                   Verify
//                 </button>
//               </td>
//               <td>{verificationStatus[user.id] || 'Not Verified'}</td>
//               <td>{airdropStatus[user.id] || 'Not Checked'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ProtocolDashboard;

// import React, { useState, useEffect } from 'react';

// // Hardcoded providers (same as in UserDashboard)
// const PROVIDERS = [
//   { index: 1, name: "Github_username", provider_Id: "0x1D8170DcC668271a0BA0f04F59c1EB8B22b4124D" },
//   { index: 2, name: "Blinkit_Last_Order", provider_Id: "0x1D8170DcC668271a0BA0f04F59c1EB8B22b4124D" },
//   { index: 3, name: "Gmail_Account", provider_Id: "0x1D8170DcC668271a0BA0f04F59c1EB8B22b4124D" }
// ];

// function ProtocolDashboard({ walletAddress, contract }) {
//   const [users, setUsers] = useState([]);
//   const [verificationStatus, setVerificationStatus] = useState({});
//   const [airdropStatus, setAirdropStatus] = useState({});

//   useEffect(() => {
//     fetchUsers();
//   }, [contract]);

//   async function fetchUsers() {
//     if (!contract) return;
//     try {
//       const userList = await contract.getUsers();
//       setUsers(userList);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   }

//   async function verifyUser(userId, providerId) {
//     if (!contract) return;
//     try {
//       const tx = await contract.verifyUser(userId, providerId);
//       await tx.wait();
//       setVerificationStatus(prev => ({ ...prev, [userId]: 'Verified' }));
//       await checkAirdropEligibility(userId);
//     } catch (error) {
//       console.error("Error verifying user:", error);
//       setVerificationStatus(prev => ({ ...prev, [userId]: 'Verification Failed' }));
//     }
//   }

//   async function checkAirdropEligibility(userId) {
//     if (!contract) return;
//     try {
//       const eligible = await contract.checkAirdropEligibility(userId);
//       setAirdropStatus(prev => ({ ...prev, [userId]: eligible ? 'Eligible' : 'Not Eligible' }));
//     } catch (error) {
//       console.error("Error checking airdrop eligibility:", error);
//       setAirdropStatus(prev => ({ ...prev, [userId]: 'Error Checking Eligibility' }));
//     }
//   }

//   return (
//     <div className="protocol-dashboard">
//       <h2>Protocol Dashboard</h2>
//       <p>Wallet Address: {walletAddress}</p>
//       <h3>Users with Submitted Proofs:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>User Address</th>
//             <th>Provider</th>
//             <th>Actions</th>
//             <th>Verification Status</th>
//             <th>Airdrop Eligibility</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.index}>
//               <td>{user.address}</td>
//               <td>{PROVIDERS.find(p => p.index === user.providerId)?.name || 'Unknown'}</td>
//               <td>
//                 {PROVIDERS.map(provider => (
//                   <button key={provider.index} onClick={() => verifyUser(user.index, provider.index)}>
//                     Verify {provider.name}
//                   </button>
//                 ))}
//               </td>
//               <td>{verificationStatus[user.index] || 'Not Verified'}</td>
//               <td>{airdropStatus[user.index] || 'Not Checked'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ProtocolDashboard;
// import './UserDashboard.css';

// import React, { useState, useEffect } from 'react';
// import { Reclaim } from '@reclaimprotocol/js-sdk';

// function ProtocolDashboard({ walletAddress, contract }) {
//   const [providers, setProviders] = useState([]);
//   const [newProviderName, setNewProviderName] = useState('');
//   const [users, setUsers] = useState([]);

//   const APP_ID = "0x1D8170DcC668271a0BA0f04F59c1EB8B22b4124D"; // Replace with your applicationId
//   const reclaimClient = new Reclaim.ProofRequest(APP_ID);

//   useEffect(() => {
//     fetchProviders();
//     fetchUsers();
//   }, []);

//   async function fetchProviders() {
//     if (contract) {
//       try {
//         const providerList = await contract.getProviders();
//         setProviders(providerList);
//       } catch (error) {
//         console.error("Error fetching providers:", error);
//       }
//     }
//   }

//   async function fetchUsers() {
//     if (contract) {
//       try {
//         const userList = await contract.getUsers();
//         setUsers(userList);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     }
//   }

//   // async function addProvider() {
//   //   if (contract && newProviderName) {
//   //     try {
//   //       const tx = await contract.addProvider(newProviderName);
//   //       await tx.wait();
//   //       setNewProviderName('');
//   //       fetchProviders();
//   //     } catch (error) {
//   //       console.error("Error adding provider:", error);
//   //     }
//   //   }
//   // }

//   async function verifyUserProof(user) {
//     const providerId = 'f9f383fd-32d9-4c54-942f-5e9fda349762'; // Replace with your provider ID

//     reclaimClient.addContext(
//       (`user's address: ${user.address}`),
//       ('for verification on protocol dashboard')
//     );

//     await reclaimClient.buildProofRequest(providerId);

//     reclaimClient.setSignature(
//       await reclaimClient.generateSignature(
//         '0xd2f9ca547f366afeed274ee77695cf0be5aa3674492cfb14539938c128b5c198' // Replace with your APP_SECRET
//       )
//     );

//     const { requestUrl } = await reclaimClient.createVerificationRequest();

//     await reclaimClient.startSession({
//       onSuccessCallback: proof => {
//         console.log('Verification success', proof);
//         alert(`Verification successful for user ${user.address}`);
//         fetchUsers(); // Refresh user list to update eligibility
//       },
//       onFailureCallback: error => {
//         console.error('Verification failed', error);
//         alert(`Verification failed for user ${user.address}`);
//       }
//     });

//     window.open(requestUrl, '_blank');
//   }

//   return (
//     <div className="protocol-dashboard">
//       <h2>Protocol Dashboard</h2>
//       <p>Wallet Address: {walletAddress}</p>
      
//       <h3>Providers</h3>
//       <ul>
//         {providers.map((provider, index) => (
//           <li key={index}>{provider.name}</li>
//         ))}
//       </ul>
      

//       <h3>Users</h3>
//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>User Address</th>
        
//             <th>Eligibility</th>
//             <th>Provider Name</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={index}>
//               <td>{user.address}</td>
//               <td>{user.isEligible ? 'Eligible' : 'Not Eligible'}</td>
//               <td>{user.providerName}</td>
//               <td>
//                 <button onClick={() => verifyUserProof(user)}>Verify Proof</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ProtocolDashboard;


// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

// const ProtocolDashboard = ({ walletAddress, verifyUser, checkAirdropEligibility, contract }) => {
//   const [users, setUsers] = useState([]);
//   const [verificationStatus, setVerificationStatus] = useState({});
//   const [airdropStatus, setAirdropStatus] = useState({});

//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (contract) {
//         const userList = await contract.getUsers();
//         setUsers(userList);
//       }
//     };
//     fetchUsers();
//   }, [contract]);

//   async function handleVerifyUser(userId, providerId) {
//     setVerificationStatus(prev => ({ ...prev, [userId]: 'Verifying...' }));
//     const result = await verifyUser(userId, providerId);
//     setVerificationStatus(prev => ({ ...prev, [userId]: result ? 'Verified' : 'Failed' }));
    
//     if (result) {
//       const eligible = await checkAirdropEligibility(userId);
//       setAirdropStatus(prev => ({ ...prev, [userId]: eligible ? 'Eligible' : 'Not Eligible' }));
//     }
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Protocol Dashboard</h2>
//       <p className="mb-4">Wallet Address: {walletAddress}</p>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-1/4">User Address</TableHead>
//             <TableHead className="w-1/4">Eligibility</TableHead>
//             <TableHead className="w-1/4">Provider Name</TableHead>
//             <TableHead className="w-1/4">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>{user.address}</TableCell>
//               <TableCell>{airdropStatus[user.id] || 'Unknown'}</TableCell>
//               <TableCell>{user.providerName}</TableCell>
//               <TableCell>
//                 <Button 
//                   onClick={() => handleVerifyUser(user.id, user.providerId)}
//                   disabled={verificationStatus[user.id] === 'Verifying...'}
//                 >
//                   {verificationStatus[user.id] || 'Verify'}
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ProtocolDashboard;

import './ProtocolDashboard.css';
import React, { useState, useEffect } from 'react';
import { Reclaim } from '@reclaimprotocol/js-sdk';

const ProtocolDashboard = ({ walletAddress, verifyUser, checkAirdropEligibility, contract }) => {
  const [users, setUsers] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState({});
  const [airdropStatus, setAirdropStatus] = useState({});
  const [providers, setProviders] = useState([]);
  const [newProviderName, setNewProviderName] = useState('');

  const APP_ID = "0x1D8170DcC668271a0BA0f04F59c1EB8B22b4124D"; // Replace with your applicationId
  const reclaimClient = new Reclaim.ProofRequest(APP_ID);

  useEffect(() => {
    // const fetchUsers = async () => {
    //   if (contract) {
    //     const userList = await contract.getUsers();
    //     setUsers(userList);
    //   }
    // };
    fetchUsers();
  }, [contract]);

  async function handleVerifyUser(userId, providerId) {
    setVerificationStatus(prev => ({ ...prev, [userId]: 'Verifying...' }));
    const result = await verifyUser(userId, providerId);
    setVerificationStatus(prev => ({ ...prev, [userId]: result ? 'Verified' : 'Failed' }));
    
    if (result) {
      const eligible = await checkAirdropEligibility(userId);
      setAirdropStatus(prev => ({ ...prev, [userId]: eligible ? 'Eligible' : 'Not Eligible' }));
    }
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thStyle = {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f2f2f2'
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  };

  const buttonStyle = {
    padding: '5px 10px',
    cursor: 'pointer'
  };

  async function fetchProviders() {
    if (contract) {
      try {
        const providerList = await contract.getProviders();
        setProviders(providerList);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    }
  }

  async function fetchUsers() {
    if (contract) {
      try {
        const userList = await contract.getUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }

  async function verifyUserProof(user) {
    const providerId = 'f9f383fd-32d9-4c54-942f-5e9fda349762'; // Replace with your provider ID

    reclaimClient.addContext(
      (`user's address: ${user.address}`),
      ('for verification on protocol dashboard')
    );

  await reclaimClient.buildProofRequest(providerId);

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(
        '0xd2f9ca547f366afeed274ee77695cf0be5aa3674492cfb14539938c128b5c198' // Replace with your APP_SECRET
      )
    );

    const { requestUrl } = await reclaimClient.createVerificationRequest();

    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof);
        alert(`Verification successful for user ${user.address}`);
        fetchUsers(); // Refresh user list to update eligibility
      },
      onFailureCallback: error => {
        console.error('Verification failed', error);
        alert(`Verification failed for user ${user.address}`);
      }
    });

    window.open(requestUrl, '_blank');
  }

  return (

  <div className="protocol-dashboard">
      <h2>Protocol Dashboard</h2>
      <p>Wallet Address: {walletAddress}</p>
      
      <h3>Providers</h3>
      <ul>
        {providers.map((provider, index) => (
          <li key={index}>{provider.name}</li>
        ))}
      </ul>
      
      <h3>Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>User Address</th>
            <th>Eligibility</th>
            <th>Provider Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.address}</td>
              <td>{user.isEligible ? 'Eligible' : 'Not Eligible'}</td>
              <td>{user.providerName}</td>
              <td>
                <button onClick={() => verifyUserProof(user)}>Verify Proof</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}
export default ProtocolDashboard;