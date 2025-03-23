const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user_id: {type: String, required: true},
  name: {type: String, required: true},
  content: {type: String, required: true},
  description: String,
  created_at: {type: Date, required: true}
})

module.exports = mongoose.model('contacts', schema)