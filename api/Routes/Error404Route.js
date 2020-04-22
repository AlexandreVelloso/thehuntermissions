const express = require('express');

const router = express.Router();

router.all('*', (req, res) => res.status(404).end());

module.exports = router;
