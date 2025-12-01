const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')
const config = require('./config/env')

const app = express()

app.use(helmet())
app.use(cors({ origin: config.clientOrigin.split(',').map(origin => origin.trim()) }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', '..', 'frontend', 'dist')

  app.use(express.static(distPath))

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({
    message: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
})

module.exports = app
