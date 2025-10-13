const Path = require('../models/Path')
const pathsStatic = require('../data/paths')
const config = require('../config/env')

async function getPaths (req, res, next) {
  try {
    if (config.useFakeDb) {
      const sorted = [...pathsStatic].sort((a, b) => a.name.localeCompare(b.name))
      return res.json(sorted)
    }

    const paths = await Path.find().sort({ name: 1 })
    res.json(paths)
  } catch (error) {
    next(error)
  }
}

async function getPathBySlug (req, res, next) {
  try {
    const { slug } = req.params
    let path

    if (config.useFakeDb) {
      path = pathsStatic.find(item => item.slug === slug)
    } else {
      path = await Path.findOne({ slug })
    }

    if (!path) {
      return res.status(404).json({ message: 'Path not found' })
    }

    res.json(path)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPaths,
  getPathBySlug
}
