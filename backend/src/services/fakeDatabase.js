const { randomUUID } = require('crypto')
const slugify = require('../utils/slugify')
const seedThreads = require('../data/threads')

const fallbackUsers = []

const fallbackThreads = seedThreads.map((thread, index) => ({
  _id: thread._id || randomUUID(),
  title: thread.title,
  slug: thread.slug || `${slugify(thread.title)}-${index + 1}`,
  author: thread.author || 'Anonymous Seer',
  authorId: thread.authorId || null,
  content: thread.content,
  isSpoiler: Boolean(thread.isSpoiler),
  likedBy: Array.isArray(thread.likedBy) ? [...thread.likedBy] : [],
  dislikedBy: Array.isArray(thread.dislikedBy) ? [...thread.dislikedBy] : [],
  replies: (thread.replies || []).map(reply => ({
    _id: reply._id || randomUUID(),
    author: reply.author || 'Anonymous Seer',
    authorId: reply.authorId || null,
    content: reply.content,
    likedBy: Array.isArray(reply.likedBy) ? [...reply.likedBy] : [],
    dislikedBy: Array.isArray(reply.dislikedBy) ? [...reply.dislikedBy] : [],
    createdAt: reply.createdAt ? new Date(reply.createdAt) : new Date(),
    updatedAt: reply.updatedAt ? new Date(reply.updatedAt) : new Date()
  })),
  createdAt: thread.createdAt ? new Date(thread.createdAt) : new Date(Date.now() - (index * 3600000)),
  updatedAt: thread.updatedAt ? new Date(thread.updatedAt) : new Date()
}))

module.exports = {
  fallbackUsers,
  fallbackThreads
}
