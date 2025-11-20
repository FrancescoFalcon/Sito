const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/env')

function normaliseUser (user) {
  if (!user) {
    return null
  }

  if (typeof user.toSafeObject === 'function') {
    const safeDoc = user.toSafeObject()
    if (!safeDoc.id && safeDoc._id) {
      safeDoc.id = safeDoc._id
    }
    return safeDoc
  }

  const { password, ...safeUser } = user
  if (!safeUser.id && safeUser._id) {
    safeUser.id = safeUser._id
  }
  return safeUser
}

function signToken (userId) {
  return jwt.sign({ sub: userId }, config.jwtSecret, { expiresIn: '7d' })
}

async function register (req, res, next) {
  try {
    const username = req.body.username ? req.body.username.trim() : ''
    const password = req.body.password

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    const existing = await User.findOne({ username })

    if (existing) {
      return res.status(409).json({ message: 'Username already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userPayload = {
      username,
      password: hashedPassword
    }

    const createdUser = await User.create(userPayload)

    const token = signToken(createdUser.id)
    res.status(201).json({ token, user: createdUser.toSafeObject() })
  } catch (error) {
    next(error)
  }
}

async function login (req, res, next) {
  try {
    const username = req.body.username ? req.body.username.trim() : ''
    const password = req.body.password

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = signToken(user.id)
    res.json({ token, user: user.toSafeObject() })
  } catch (error) {
    next(error)
  }
}

async function profile (req, res, next) {
  try {
    const safeUser = normaliseUser(req.user)
    res.json({ user: safeUser })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  profile
}
