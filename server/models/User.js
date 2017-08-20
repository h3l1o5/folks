const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  account: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  displayName: String,
  gender: String
})

userSchema.methods.name = function() {
  return this.displayName
}

module.exports = mongoose.model('Users', userSchema)