const Character = require('../models/Character')
const charactersStatic = require('../data/characters')
const config = require('../config/env')

async function getCharacters (req, res, next) {
  try {
    if (config.useFakeDb) {
      const sorted = [...charactersStatic].sort((a, b) => a.name.localeCompare(b.name))
      return res.json(sorted)
    }

    const characters = await Character.find().sort({ name: 1 }).lean()

    if (!characters.length) {
      const sortedFallback = [...charactersStatic].sort((a, b) => a.name.localeCompare(b.name))
      return res.json(sortedFallback)
    }

    const normalised = characters.map(character => ({
      ...character,
      aliases: Array.isArray(character.aliases) ? character.aliases : (character.aliases ? [character.aliases].flat() : []),
      category: character.category || 'Relevant Characters',
      age: character.age || null,
      height: character.height || null,
      pathway: character.pathway || 'Unknown',
      sequence: character.sequence || 'Unknown',
      description: character.description || '',
      image: character.image || null
    }))

    res.json(normalised)
  } catch (error) {
    next(error)
  }
}

async function getCharacterBySlug (req, res, next) {
  try {
    const { slug } = req.params
    let character

    if (config.useFakeDb) {
      character = charactersStatic.find(item => item.slug === slug)
    } else {
      character = await Character.findOne({ slug }).lean()
    }

    if (!character) {
      const fallback = charactersStatic.find(item => item.slug === slug)
      if (!fallback) {
        return res.status(404).json({ message: 'Character not found' })
      }
      return res.json(fallback)
    }

    const response = {
      ...character,
      aliases: Array.isArray(character.aliases) ? character.aliases : (character.aliases ? [character.aliases].flat() : []),
      category: character.category || 'Relevant Characters',
      age: character.age || null,
      height: character.height || null,
      pathway: character.pathway || 'Unknown',
      sequence: character.sequence || 'Unknown',
      description: character.description || '',
      image: character.image || null
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCharacters,
  getCharacterBySlug
}
