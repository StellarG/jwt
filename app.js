const express = require("express");
const app = express();
const link = require('../jwt/routes/route');

app.use('/api/jwt', link);

module.exports = app