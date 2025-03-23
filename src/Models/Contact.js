const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user_id: {type: String, required: true},
  name: {type: String, required: true},
  content: {type: String, required: true},
  description: String
})

module.exports = mongoose.model('contacts', schema)