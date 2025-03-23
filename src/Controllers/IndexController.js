const Contact = require('../Models/Contact')

module.exports = class {
  static async index(req, res) {
    res.locals.pageTitle = "Lista de contatos"
    const user = req.session.user
    const contacts = await Contact.where("user_id").equals(user.id).exec()
    res.render('index', {contacts})
  }

  static create(req, res) {
    res.locals.pageTitle = "Criar contato"

    res.render('contacts/create')
  }
}