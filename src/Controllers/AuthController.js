module.exports = class {
  static index(req, res) {
    res.render('auth/login')
  }

  static attempt(req, res) {
    const {username, password} = req.body

    if (!username || !password) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'Preencha todos os campos')
      return res.redirect('auth')
    }

    res.send('Em construção')
  }
}