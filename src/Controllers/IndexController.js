const Contact = require('../Models/Contact')
const timeFormatted = require('../Support/timeFormatted')

module.exports = class {
  static async index(req, res) {
    res.locals.pageTitle = "Lista de contatos"
    const user = req.session.user
    const contacts = await Contact.where("user_id").equals(user.id).sort({created_at: -1}).exec()
    res.render('index', {contacts})
  }

  static create(req, res) {
    res.locals.pageTitle = "Criar contato"

    res.render('contacts/create')
  }

  static async store(req, res) {
    const {name, content, description} = req.body

    // validação
    if (!name || !content) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'O campo nome e conteúdo são obrigatórios')
      res.writeHead(302, {Location: '/contacts/create'})
      return res.end()
    } else if (await Contact.where('content').equals(content).findOne()) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'Contato com esse nome já existe')
      res.writeHead(302, {Location: '/contacts/create'})
      return res.end()
    }

    await Contact.create({
      user_id: req.session.user.id,
      name: name.toLowerCase(),
      content,
      description,
      created_at: timeFormatted.datetime()
    })
    req.flash('message_type', 'success')
    req.flash('message_text', 'Contato adicionado com sucesso')
    res.writeHead(302, {Location: '/'})
    res.end()
  }

  static async edit(req, res) {
    res.locals.pageTitle = "Editar contato"

    const id = req.params.id 
    const contact = await Contact.findOne({
      _id: id,
      user_id: req.session.user.id
    })

    if (!contact) {
      res.status(404)
      return res.end()
    }
    res.render('contacts/edit', {contact})
  }

  static async update(req, res) {
    const id = req.params.id
    const contact = await Contact.findOne({
      _id: id,
      user_id: req.session.user.id
    })
    const {name, content, description} = req.body

    if (!contact) {
      res.status(404)
      return res.end()
    } else if (!name || !content) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'O campo nome e conteúdo são obrigatórios')
      res.writeHead(302, {Location: '/contacts/create'})
      return res.end()
    } else if (await Contact.findOne({
      _id: {$ne: id},
      user_id: req.session.user.id,
      name: name.toLowerCase()
    })) {
      req.flash('message_type', 'danger')
      req.flash('message_text', 'Contato com esse nome já existe')
      res.writeHead(302, {Location: '/contacts/' + id})
      return res.end()
    }

    await Contact.where("_id").equals(id).updateOne({
      name: name.toLowerCase(),
      content,
      description
    })
    req.flash('message_type', 'success')
    req.flash('message_text', "Contato atualizado com sucesso")
    res.writeHead(302, {Location: '/'})
    res.end()
  }

  static async destroy(req, res) {
    const id = req.params.id
    const contact = await Contact.findOne({
      _id: id,
      user_id: req.session.user.id
    })

    if (!contact) {
      res.status(404)
      return res.end()
    }

    await Contact.deleteOne({
      _id: id
    })

    req.flash('message_type', 'success')
    req.flash('message_text', 'Contato removido com sucesso')
    res.writeHead(302, {Location: '/'})
    res.end()
  }
}