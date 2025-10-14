const http = require('http')
const app = require('./app')
const config = require('./config/env')
const { connectToDatabase } = require('./config/db')

async function start () {
  if (!config.useFakeDb) {
    try {
      await connectToDatabase()
      console.log('✅ Connected to MongoDB Atlas')
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message)
      config.useFakeDb = true
    }
  } else {
    console.warn('USE_FAKE_DB=true - the API will use static fallback data')
  }
  // Serve Vue static files in production
  const PORT = process.env.PORT || config.port || 3000
  const server = http.createServer(app)
  server.listen(PORT, () => {
    const mode = config.useFakeDb ? 'static data mode' : 'MongoDB mode'
    console.log(`Lord of the Mysteries API listening at http://localhost:${PORT} (${mode})`)
  })
}

start()
