const http = require('http')
const app = require('./app')
const config = require('./config/env')
const { connectToDatabase } = require('./config/db')

async function start () {
  try {
    await connectToDatabase()
    console.log('✅ Connected to MongoDB Atlas')

    const PORT = process.env.PORT || config.port || 3000
    const server = http.createServer(app)

    server.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

start()
