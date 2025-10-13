const dotenv = require('dotenv')

dotenv.config()

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/lotm',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  useFakeDb: process.env.USE_FAKE_DB === 'true',
  jwtSecret: process.env.JWT_SECRET || 'lotm-secret-key-change-me'
}

module.exports = config
