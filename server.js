require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const path = require('path')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require("express-flash")
const bootstrapMiddlewares = require('./src/middlewares/bootstrap')
const mongoose = require('mongoose')
const csrf = require('csurf')

const app = express()

// set engine/path views
mongoose.connect(process.env.MONGO_CONNECTION)

app.set("views", path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: false,
  store: new FileStore({
    path: "./sessions",
    retries: 1
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    httpOnly: true
  }
}))
app.use(flash())
app.use(csrf())
app.use(bootstrapMiddlewares.checkCsrf)
app.use(bootstrapMiddlewares.implementReq)


mongoose.connection.once('open', () => {
  app.use(routes)
  app.listen(3000, () => console.log("[ + ] online"))
})