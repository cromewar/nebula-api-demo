import fetch from "node-fetch"; // Use ES Module import

// Function to query Nebula
async function queryNebula(contractAddress, message) {
  try {
    const response = await fetch("https://nebula-api.thirdweb.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": "", // Replace with your thirdweb secret key
      },
      body: JSON.stringify({
        message: message,
        context_filter: {
          contract_addresses: [contractAddress], // Specify the smart contract address
        },
        stream: false, // Set to false for non-streaming response
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Nebula Response:", data.message);
  } catch (error) {
    console.error("Error querying Nebula:", error);
  }
}

// Call the function with your parameters
const contractAddress = "0x2228530031b1a1Cd124BEcA4F8572769D9D68188"; // Replace with your contract address
const message =
  "Get all the listing of this marketplace, use function (getAllValidListings) use as parameter for _startId: 0 and _endId: 3, show all the data don't skip anything, in Sepolia"; // Your query
queryNebula(contractAddress, message);
