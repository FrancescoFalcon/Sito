const express = require('express')
const { getPaths, getPathBySlug } = require('../controllers/pathsController')

const router = express.Router()

router.get('/', getPaths)
router.get('/:slug', getPathBySlug)

module.exports = router
