const http = require('http')
const app = require('./app')
const config = require('./config/env')
const { connectToDatabase } = require('./config/db')

async function start () {
  if (!config.useFakeDb) {
    try {
      await connectToDatabase()
      console.log('MongoDB connected successfully')
    } catch (error) {
      console.warn('MongoDB connection failed, falling back to static data:', error.message)
      config.useFakeDb = true
    }
  } else {
    console.warn('USE_FAKE_DB=true - the API will use static fallback data')
  }

  const server = http.createServer(app)
  server.listen(config.port, () => {
    const mode = config.useFakeDb ? 'static data mode' : 'MongoDB mode'
    console.log(`Lord of the Mysteries API listening at http://localhost:${config.port} (${mode})`)
  })
}

start()
