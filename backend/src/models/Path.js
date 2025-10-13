const mongoose = require('mongoose')

const SequenceSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  name: { type: String },
  potionName: { type: String },
  mainAbilities: [{ type: String }],
  madnessPrinciple: { type: String }
}, { _id: false })

const PathSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ['standard', 'boon', 'legacy'], default: 'standard' },
  image: { type: String },
  domains: [{ type: String }],
  symbol: { type: String },
  description: { type: String },
  associatedColor: { type: String },
  sequences: [SequenceSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Path', PathSchema)
