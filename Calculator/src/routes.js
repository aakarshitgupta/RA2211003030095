const express = require('express');
const { fetchNumbers } = require('./controller');

const router = express.Router();

router.get('/numbers/:numberId', fetchNumbers);

module.exports = router;
