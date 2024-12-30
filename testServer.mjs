import fetch from "node-fetch";
const SERVER_URL = "http://localhost:3001";

// Function to send a query to the server
async function testQuery(message) {
  try {
    const response = await fetch(`${SERVER_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Query response:", data);
  } catch (error) {
    console.error("Error testing query:", error);
  }
}

async function testSpecificContractQuery(contractAddress, message) {
  try {
    const response = await fetch(`${SERVER_URL}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        context_filter: {
          contract_addresses: [contractAddress],
          chain_ids: [11155111],
        },
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Query response:", data);
  } catch (error) {
    console.error("Error testing query", error);
  }
}

// Function to test the server
async function runTest() {
  console.log("Testing Query...");
  await testSpecificContractQuery(
    "0x2228530031b1a1Cd124BEcA4F8572769D9D68188",
    "what can you tell me about this contract in Sepolia"
  );
}

runTest();
