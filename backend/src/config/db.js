const mongoose = require('mongoose')
const config = require('./env')

let isConnected = false

async function connectToDatabase () {
  if (isConnected) return mongoose.connection

  mongoose.set('strictQuery', true)

  try {
    // Aggiungiamo opzioni per migliorare la stabilità della connessione in container
    await mongoose.connect(config.mongoUri, {
      family: 4 // Forza l'uso di IPv4 per evitare problemi DNS con SRV records
    })
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
