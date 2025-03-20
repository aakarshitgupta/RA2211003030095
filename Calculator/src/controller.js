require('dotenv').config(); 
const axios = require('axios');

const API_URL = 'http://20.244.56.144/numbers';
const WINDOW_SIZE = 10;
const TIMEOUT = 500;

let storedNumbers = [];

// Function to fetch numbers from the third-party API
async function fetchNumbers(req, res) {
    console.log(`Incoming request for number ID: ${numberId}`);
    console.log(`Incoming request for number ID: ${req.params.numberId}`);

    const numberId = req.params.numberId.toUpperCase();

    // Step 1: Validate number ID (must be P, F, E, or R)
    if (!['P', 'F', 'E', 'R'].includes(numberId)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    // Step 2: Store the previous state of numbers
    const previousState = [...storedNumbers];

    try {
        // Step 3: API call with timeout logic
        const source = axios.CancelToken.source();
        setTimeout(() => source.cancel(), TIMEOUT);

        const response = await axios.get(`${API_URL}/${numberId}`, { cancelToken: source.token });
        const newNumbers = response.data.numbers || [];

        // Step 4: Filter and add unique numbers only
        newNumbers.forEach((num) => {
            if (!storedNumbers.includes(num)) {
                if (storedNumbers.length >= WINDOW_SIZE) {
                    storedNumbers.shift(); // Remove oldest element when window size exceeds 10
                }
                storedNumbers.push(num);
            }

        });

        // Step 5: Calculate the average
        const average = storedNumbers.length > 0
            ? (storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length).toFixed(2)
            : "N/A";

        // Step 6: Send the response
        return res.json({
            window_previous_state: previousState,
            window_current_state: [...storedNumbers],
            numbers: newNumbers,
            average: average
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);
        return res.status(500).json({ error: 'Failed to fetch numbers within 500ms' });
    }
}

module.exports = { fetchNumbers };
