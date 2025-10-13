const mongoose = require('mongoose')

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aliases: [{ type: String }],
  slug: { type: String, required: true, unique: true },
  category: {
    type: String,
    required: true,
    enum: ['Tarot Club Members', 'Relevant Characters', 'Villains', 'Gods', 'Outer Gods']
  },
  age: { type: String, default: null },
  height: { type: String, default: null },
  pathway: { type: String, required: true },
  sequence: { type: String, required: true },
  description: { type: String },
  image: { type: String, default: null }
}, {
  timestamps: true
})

module.exports = mongoose.model('Character', CharacterSchema)
