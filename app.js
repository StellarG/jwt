const express = require("express")
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()
const link = require('../jwt/routes/route')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet())

app.use('/api/jwt', link)

module.exports = app