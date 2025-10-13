const express = require('express')
const { getCharacters, getCharacterBySlug } = require('../controllers/charactersController')

const router = express.Router()

router.get('/', getCharacters)
router.get('/:slug', getCharacterBySlug)

module.exports = router
