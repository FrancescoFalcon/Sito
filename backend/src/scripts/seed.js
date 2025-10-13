const { connectToDatabase } = require('../config/db')
const Path = require('../models/Path')
const Character = require('../models/Character')
const Thread = require('../models/Thread')
const pathsData = require('../data/paths')
const charactersData = require('../data/characters')
const threadsData = require('../data/threads')

async function seed () {
  try {
    await connectToDatabase()

    await Promise.all([
      Path.deleteMany({}),
      Character.deleteMany({}),
      Thread.deleteMany({})
    ])

    const defaultColors = {
      standard: '#f1c661',
      boon: '#9f7aea'
    }

    const normalisedPaths = pathsData.map(path => ({
      ...path,
      associatedColor: path.associatedColor || defaultColors[path.type] || '#f1c661',
      sequences: (path.sequences || []).map(sequence => ({
        level: sequence.level,
        name: sequence.name,
        potionName: sequence.potionName || sequence.name,
        mainAbilities: Array.isArray(sequence.mainAbilities) ? sequence.mainAbilities : [],
        madnessPrinciple: sequence.madnessPrinciple || 'See canonical lore'
      }))
    }))

    await Path.insertMany(normalisedPaths)
    await Character.insertMany(charactersData)
    await Thread.insertMany(threadsData)

    console.log('Database seeded with Lord of the Mysteries lore data')
  } catch (error) {
    console.error('Seeding error:', error)
  } finally {
    process.exit(0)
  }
}

seed()
