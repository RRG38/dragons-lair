require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const bcrypt = require('bcryptjs')

const authCtrl = require('./controllers/authController')

const PORT = 4000
const { SESSION_SECRET, CONNECTION_STRING } = process.env
const { register, login, logout } = require('./controllers/authController')
const { dragonTreasure} = require('./controllers/treasureController')

const app = express()

app.use(express.json())

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
  )

app.post('/auth/register', register)

app.post('/auth/login', login);

app.get('/auth/logout', logout);

app.get('/api/treasure/dragon', dragonTreasure);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
  }).then(db => {
  app.set('db', db)
  app.listen(PORT, () => console.log(`DB connected and server listening on port ${PORT}`))
  })
  .catch(err => console.log(err))

