require('dotenv').config(); 
const axios = require('axios');

const API_URL = 'http://20.244.56.144/numbers';
const WINDOW_SIZE = 10;
const TIMEOUT = 5000;

let storedNumbers = [];

async function fetchNumbers(req, res) {
    
    
    const numberId = req.params.numberId.toUpperCase();
    console.log(`Incoming request for number ID: ${numberId}`);
    console.log(`Incoming request for number ID: ${req.params.numberId}`);

    if (!['P', 'F', 'E', 'R'].includes(numberId)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const previousState = [...storedNumbers];

    try {
        const source = axios.CancelToken.source();
        setTimeout(() => source.cancel(), TIMEOUT);

        const response = await axios.get(`${API_URL}/${numberId}`, { cancelToken: source.token });
        const newNumbers = response.data.numbers || [];

        newNumbers.forEach((num) => {
            if (!storedNumbers.includes(num)) {
                if (storedNumbers.length >= WINDOW_SIZE) {
                    storedNumbers.shift();
                }
                storedNumbers.push(num);
            }

        });

        const average = storedNumbers.length > 0
            ? (storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length).toFixed(2)
            : "N/A";

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
