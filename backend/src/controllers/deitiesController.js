const deities = require('../data/deities')

async function getDeities (req, res, next) {
  try {
    res.json(deities)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getDeities
}
