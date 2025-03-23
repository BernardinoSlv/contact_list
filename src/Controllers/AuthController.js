const crypto = require('crypto')
const User = require('../Models/User')
const fs = require("fs").promises

module.exports = class {
  static index(req, res) {
    res.locals.pageTitle = "Login"

    res.render('auth/login')
  }

  static async attempt(req, res) {
    const {username, password} = req.body

    if (!username || !password) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'Preencha todos os campos')
      return res.redirect('/auth')
    }
    const passwordHash = crypto.createHash('md5').update(password).digest('hex')
    const user = (await User.where('username').equals(username)
      .where("password").equals(passwordHash)
      .limit(1).exec()).pop()
    if (!user) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'Usuário ou senha incorretos')
      res.writeHead(302, {Location: '/auth'})
      req.flash('_old', {username: username})

      return res.end()
    }
    req.session.user = {id: user._id, username: user.username}
    res.writeHead(302, {Location: "/"})
    res.end()
  }

  static register(req, res) {
    res.locals.pageTitle = "Cadastre-se"

    res.render('auth/register')
  }

  static store(req, res) {
    const {username, password, password_confirm} = req.body

    console.log(username, password, password_confirm)
    res.send('muito bem')
  }

  static logout(req, res) {
    if (req.session.user) {
      delete req.session.user
    }
    req.flash('message_type', 'primary')
    req.flash('message_text', 'Logout realizado com sucesso')
    res.writeHead(302, {Location: '/auth'})
    res.end()
  }
}