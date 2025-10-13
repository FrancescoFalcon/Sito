const express = require('express')
const { getDeities } = require('../controllers/deitiesController')

const router = express.Router()

router.get('/', getDeities)

module.exports = router
