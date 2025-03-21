const express = require('express')
const {checkLogin} = require('./src/middlewares/auth')
const IndexController = require('./src/Controllers/IndexController')
const AuthController = require('./src/Controllers/AuthController')

const routes = express.Router()

// rotas auth
routes.get('/auth', AuthController.index)
routes.post('/auth', AuthController.attempt)

// rotas index
routes.get('/', checkLogin, IndexController.index)

module.exports = routes