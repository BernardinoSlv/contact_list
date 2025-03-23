exports.checkLogin = (req, res, next) => {
  if (!req.session?.user) {
    req.flash('message_type', "warning")
    req.flash('message_text', "Faça login para acessar o painel")
    res.writeHead(302, {Location: "/auth"})
    return res.end()
  }
  next()
} 