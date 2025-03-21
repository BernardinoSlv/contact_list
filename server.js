require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const path = require('path')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require("express-flash")

const app = express()

// set engine/path views
app.set("views", path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  store: new FileStore({
    path: "./sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))
app.use(flash())
app.use()

app.use(routes)

app.listen(3000, () => console.log("[ + ] online"))