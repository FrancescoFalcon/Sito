const Thread = require('../models/Thread')
const slugify = require('../utils/slugify')

function normaliseId (value) {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value.toString === 'function') return value.toString()
  return value
}

function toPlainThread (source) {
  const thread = typeof source.toObject === 'function'
    ? source.toObject({ versionKey: false })
    : source

  const likedBy = (thread.likedBy || []).map(normaliseId)
  const dislikedBy = (thread.dislikedBy || []).map(normaliseId)

  const replies = (thread.replies || []).map(reply => {
    const replyLikedBy = (reply.likedBy || []).map(normaliseId)
    const replyDislikedBy = (reply.dislikedBy || []).map(normaliseId)
    return {
      _id: reply._id,
      author: reply.author,
      authorId: normaliseId(reply.authorId),
      content: reply.content,
      likedBy: replyLikedBy,
      dislikes: replyDislikedBy.length,
      likes: replyLikedBy.length,
      dislikedBy: replyDislikedBy,
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt
    }
  })

  return {
    _id: thread._id,
    title: thread.title,
    slug: thread.slug,
    author: thread.author,
    authorId: normaliseId(thread.authorId),
    content: thread.content,
    isSpoiler: Boolean(thread.isSpoiler),
    likedBy,
    likes: likedBy.length,
    dislikedBy,
    dislikes: dislikedBy.length,
    replies,
    createdAt: thread.createdAt,
    updatedAt: thread.updatedAt
  }
}

function parseBoolean (value) {
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'string') {
    const lowered = value.trim().toLowerCase()
    return ['true', '1', 'yes', 'on'].includes(lowered)
  }
  return Boolean(value)
}

function toggleSentiment (entity, userId, sentiment) {
  const likeKey = sentiment === 'like' ? 'likedBy' : 'dislikedBy'
  const oppositeKey = sentiment === 'like' ? 'dislikedBy' : 'likedBy'
  const identity = normaliseId(userId)

  const ownList = entity[likeKey] || []
  const oppositeList = entity[oppositeKey] || []

  const hasAlready = ownList.some(id => normaliseId(id) === identity)

  if (hasAlready) {
    entity[likeKey] = ownList.filter(id => normaliseId(id) !== identity)
  } else {
    entity[likeKey] = [...ownList, identity]
    entity[oppositeKey] = oppositeList.filter(id => normaliseId(id) !== identity)
  }
}

async function getThreads (req, res, next) {
  try {
    const threads = await Thread.find().sort({ createdAt: -1 })
    res.json(threads.map(toPlainThread))
  } catch (error) {
    next(error)
  }
}

async function createThread (req, res, next) {
  try {
    const { title, content, isSpoiler: rawSpoiler } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    const isSpoiler = parseBoolean(rawSpoiler)
    const slug = `${slugify(title)}-${Date.now()}`
    const authorName = req.user.username || 'Anonymous Seer'
    const rawAuthorId = req.user._id || req.user.id

    const thread = await Thread.create({
      title,
      slug,
      author: authorName,
      authorId: rawAuthorId,
      content,
      isSpoiler
    })

    res.status(201).json(toPlainThread(thread))
  } catch (error) {
    next(error)
  }
}

async function addReply (req, res, next) {
  try {
    const { slug } = req.params
    const { content } = req.body

    if (!content) {
      return res.status(400).json({ message: 'Content is required' })
    }

    const authorName = req.user.username || 'Anonymous Seer'
    const rawAuthorId = req.user._id || req.user.id

    const thread = await Thread.findOne({ slug })
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' })
    }

    thread.replies.unshift({ author: authorName, authorId: rawAuthorId, content })
    thread.updatedAt = new Date()
    await thread.save()

    res.status(201).json(toPlainThread(thread))
  } catch (error) {
    next(error)
  }
}

async function reactToThread (req, res, next) {
  try {
    const { slug } = req.params
    const { sentiment } = req.body

    if (!['like', 'dislike'].includes(sentiment)) {
      return res.status(400).json({ message: 'Invalid sentiment value' })
    }

    const userId = req.user._id || req.user.id

    const thread = await Thread.findOne({ slug })
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' })
    }

    toggleSentiment(thread, userId, sentiment)
    thread.updatedAt = new Date()
    await thread.save()

    res.json(toPlainThread(thread))
  } catch (error) {
    next(error)
  }
}

async function reactToReply (req, res, next) {
  try {
    const { slug, replyId } = req.params
    const { sentiment } = req.body

    if (!['like', 'dislike'].includes(sentiment)) {
      return res.status(400).json({ message: 'Invalid sentiment value' })
    }

    const userId = req.user._id || req.user.id

    const thread = await Thread.findOne({ slug })
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' })
    }

    const reply = thread.replies.id(replyId)
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
    }

    toggleSentiment(reply, userId, sentiment)
    reply.updatedAt = new Date()
    thread.updatedAt = new Date()
    await thread.save()

    res.json(toPlainThread(thread))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getThreads,
  createThread,
  addReply,
  reactToThread,
  reactToReply
}
