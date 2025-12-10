const express = require('express')
const pathsRoutes = require('./pathsRoutes')
const charactersRoutes = require('./charactersRoutes')
const communityRoutes = require('./communityRoutes')
const authRoutes = require('./authRoutes')

const router = express.Router()

router.use('/paths', pathsRoutes)
router.use('/characters', charactersRoutes)
router.use('/community', communityRoutes)
router.use('/auth', authRoutes)

module.exports = router
