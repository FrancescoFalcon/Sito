const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/env')

function normaliseId (value) {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value.toString === 'function') return value.toString()
  return value
}

async function authenticate (req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret)
    let user

    user = await User.findById(payload.sub)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Auth error', error)
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = {
  authenticate
}
