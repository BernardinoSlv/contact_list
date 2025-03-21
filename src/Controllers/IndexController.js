module.exports = class {
  static index(req, res) {
    console.log(req.session)
    res.render('index')
  }
}