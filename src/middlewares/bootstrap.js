exports.implementReq = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  res.locals.flashMessage = {}
  const oldInputs = req.flash('_old')
  res.locals.old = (key) => {
    if (oldInputs.length) {
      for (let item of oldInputs) {
        if (item[key]) {
          return item[key]
        }
      }
    }
    return undefined
  }

  const messageType = req.flash('message_type').pop()
  if (messageType) {
    res.locals.flashMessage = {
      type: messageType,
      text: req.flash('message_text')
    }
  }
  next()
}

exports.checkCsrf = (err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(419).send("Token inválido")
  }
  next()
}