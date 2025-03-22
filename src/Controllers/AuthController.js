const crypto = require('crypto')
const User = require('../Models/User')
const fs = require("fs").promises

module.exports = class {
  static index(req, res) {
    res.render('auth/login')
  }

  static async attempt(req, res) {
    const {username, password} = req.body

    if (!username || !password) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'Preencha todos os campos')
      return res.redirect('/auth')
    }
    const user = await User.where('username').equals(username).limit(1).exec()
    if (!user.length) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'Usuário ou senha incorretos')
      req.session.name = "galada"
      console.log(req.session)
      res.writeHead(302, {Location: "/auth"})
      return res.end()
    }
    const passwordHash = crypto.createHash('md5').update(password).digest('hex')
  }
}