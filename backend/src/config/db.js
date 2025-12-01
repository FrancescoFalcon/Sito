const mongoose = require('mongoose')
const config = require('./env')

let isConnected = false

async function connectToDatabase () {
  if (isConnected) return mongoose.connection

  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(config.mongoUri)
    isConnected = true
    console.log('MongoDB connected successfully')

    return mongoose.connection
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`)
  }
}

module.exports = {
  connectToDatabase
}
