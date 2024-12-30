import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3001;

const corsOptions = {
  origin: "*", // Allow all origins (for development)
  methods: ["GET", "POST"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "x-secret-key"], // Allow specific headers
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(bodyParser.json()); // Middleware to parse JSON

// Nebula API Configuration
const NEBULA_API_URL = "https://nebula-api.thirdweb.com/chat";
const NEBULA_API_KEY = "";

// Function to Query Nebula
async function queryNebula(sessionId, message) {
  try {
    const payload = {
      message, // Use the message provided by the user
      session_id: sessionId || null, // Use the session ID if provided, else null
      stream: false, // Set streaming to false for simplicity
    };

    console.log("Payload sent to Nebula:", payload);

    const response = await fetch(NEBULA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": NEBULA_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error querying Nebula:", error);
    throw error;
  }
}

// Routes
app.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res
        .status(400)
        .json({ error: "The 'message' field is required." });
    }

    console.log("Received request:", { message });

    // Call Nebula API
    const response = await queryNebula(null, message); // Start without a session ID
    console.log("Nebula API response:", response);

    res.json(response);
  } catch (error) {
    console.error("Error in /ask route:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
