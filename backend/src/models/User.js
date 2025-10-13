const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 40
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.methods.toSafeObject = function toSafeObject () {
  const obj = this.toObject({ versionKey: false })
  delete obj.password
  return obj
}

module.exports = mongoose.model('User', UserSchema)
