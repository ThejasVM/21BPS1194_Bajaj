const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Handle GET request
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Handle POST request
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Input validation
    if (!Array.isArray(data) || data.some((item) => typeof item !== "string")) {
      return res
        .status(400)
        .json({ is_success: false, error: "Invalid input data format" });
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(
      (item) => item === item.toLowerCase()
    );
    const highestLowercaseAlphabet =
      lowercaseAlphabets.sort().reverse()[0] || null;

    // Generate user_id (you can customize this as needed)
    const user_id = "john_doe_17091999"; // This should be dynamically generated based on the user's input

    // Send response
    res.status(200).json({
      is_success: true,
      user_id,
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
        ? [highestLowercaseAlphabet]
        : [],
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: "Server error occurred" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
