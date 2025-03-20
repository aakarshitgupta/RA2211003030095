require('dotenv').config(); 
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 9876;

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
