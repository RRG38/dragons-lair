require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')

const PORT = 4000

const app = express()

app.use(express.json())

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))