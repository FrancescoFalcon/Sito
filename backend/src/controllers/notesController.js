const Note = require('../models/Note')
const config = require('../config/env')

const fallbackNotes = []

async function createNote (req, res, next) {
  try {
    const { title, content, tags } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    if (config.useFakeDb) {
      const now = new Date()
      const newNote = {
        _id: `fake-${now.getTime()}`,
        title,
        content,
        tags,
        createdAt: now,
        updatedAt: now
      }
      fallbackNotes.unshift(newNote)
      return res.status(201).json(newNote)
    }

    const note = await Note.create({ title, content, tags })
    res.status(201).json(note)
  } catch (error) {
    next(error)
  }
}

async function getNotes (req, res, next) {
  try {
    if (config.useFakeDb) {
      return res.json(fallbackNotes)
    }

    const notes = await Note.find().sort({ createdAt: -1 })
    res.json(notes)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createNote,
  getNotes
}
