const express = require('express')
const {checkLogin} = require('./src/middlewares/auth')
const IndexController = require('./src/Controllers/IndexController')
const AuthController = require('./src/Controllers/AuthController')

const routes = express.Router()

// rotas auth
routes.get('/auth/register', AuthController.register)
routes.post('/auth/register', AuthController.store)
routes.get('/auth', AuthController.index)
routes.post('/auth', AuthController.attempt)
routes.get('/logout', AuthController.logout)

// rotas index
routes.get('/', checkLogin, IndexController.index)
routes.get('/contacts/create', IndexController.create)
routes.post('/contacts', IndexController.store)
routes.get('/contacts/:id', IndexController.edit)
routes.put('/contacts/:id', IndexController.update)

module.exports = routes