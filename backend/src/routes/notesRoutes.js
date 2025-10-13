const express = require('express')
const { getNotes, createNote } = require('../controllers/notesController')

const router = express.Router()

router.get('/', getNotes)
router.post('/', createNote)

module.exports = router
