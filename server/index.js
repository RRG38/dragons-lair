require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')

const PORT = 4000

const { SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()

app.use(express.json())

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db)
  app.listen(PORT, () => console.log(`DB connected and server listening on port ${PORT}`))
})
.catch(err => console.log(err))

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
)
