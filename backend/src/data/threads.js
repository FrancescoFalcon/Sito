const slugify = require('../utils/slugify')

const rawThreads = [
  {
    title: 'Decoding the Fool Path symbolism',
    author: 'Hermes Librarian',
    content: 'How do you map the tarot arcana to the Beyonder pathways beyond the obvious correspondences? Let\'s collect theories.',
    isSpoiler: false,
    likedBy: [],
    dislikedBy: [],
    replies: [
      {
        author: 'Silver City Witness',
        content: 'The Fool path mirrors the paradox of omniscience and ignorance. I charted it against ancient Jotun inscriptions—posting soon.',
        likedBy: [],
        dislikedBy: []
      },
      {
        author: 'Queen of Crimson',
        content: 'Compare the Seer and Apprentice paths as well; they complete a triad in occult diagrams from the Tudor era.',
        likedBy: [],
        dislikedBy: []
      }
    ]
  },
  {
    title: 'Safehouses in Backlund after the Great Smog',
    author: 'Red Glove Archivist',
    content: 'Looking for updated intel on discreet meeting spots now that some of the Night Watcher caches are compromised.',
    isSpoiler: false,
    likedBy: [],
    dislikedBy: [],
    replies: [
      {
        author: 'Evernight Cantor',
        content: 'Try the symphonic society near the docks—the conductor is loyal to the Goddess and wards the backstage hall.',
        likedBy: [],
        dislikedBy: []
      }
    ]
  },
  {
    title: 'Best practices for handling volatile relics',
    author: 'Scholar of Alchemy',
    content: 'Share your grounding rituals and negotiation tactics. Which charms prevent mental pollution the best?',
    isSpoiler: false,
    likedBy: [],
    dislikedBy: [],
    replies: []
  }
]

const threads = rawThreads.map(thread => ({
  title: thread.title,
  slug: slugify(thread.title),
  author: thread.author || 'Anonymous Seer',
  content: thread.content,
  replies: (thread.replies || []).map(reply => ({
    author: reply.author || 'Anonymous Seer',
    content: reply.content,
    likedBy: reply.likedBy || [],
    dislikedBy: reply.dislikedBy || []
  })),
  likedBy: thread.likedBy || [],
  dislikedBy: thread.dislikedBy || []
}))

module.exports = threads
