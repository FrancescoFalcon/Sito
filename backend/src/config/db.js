const mongoose = require('mongoose')
const config = require('./env')

let isConnected = false

async function connectToDatabase () {
  if (isConnected) return mongoose.connection

  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(config.mongoUri)
    isConnected = true
    console.log('MongoDB connection established')

    // Drop legacy indexes that referenced the removed email field
    try {
      const collections = await mongoose.connection.db.listCollections({ name: 'users' }).toArray()
      if (collections.length > 0) {
        const usersCollection = mongoose.connection.db.collection('users')
        const indexes = await usersCollection.indexes()
        const legacyEmailIndex = indexes.find(index => index.name === 'email_1')
        if (legacyEmailIndex) {
          await usersCollection.dropIndex('email_1')
          console.log('Dropped legacy users.email_1 index')
        }
      }
    } catch (indexError) {
      if (indexError.codeName !== 'IndexNotFound') {
        console.warn('Warning: unable to drop legacy email index:', indexError.message)
      }
    }

    return mongoose.connection
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    throw error
  }
}

module.exports = {
  connectToDatabase
}
