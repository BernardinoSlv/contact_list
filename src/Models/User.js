const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
})

const User = mongoose.model("users", schema)

module.exports = User