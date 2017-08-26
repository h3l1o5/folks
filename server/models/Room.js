const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
  title: { type: String, required: true },
  createBy: { type: String, required: true },
  createAt: {type: Date, default: Date.now },
  userGroup: { type: [String], required: true },
  messages: [
    {
      createBy: { type: String, required: true },
      createAt: { type: Date, required: true },
      content: { type: String, required: true }
    }
  ]
})

module.exports = mongoose.model('Rooms', roomSchema)