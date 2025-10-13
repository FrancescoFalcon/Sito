const express = require('express')
const {
  getThreads,
  createThread,
  addReply,
  reactToThread,
  reactToReply
} = require('../controllers/threadsController')
const { authenticate } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authenticate)

router.get('/threads', getThreads)
router.post('/threads', createThread)
router.post('/threads/:slug/replies', addReply)
router.patch('/threads/:slug/react', reactToThread)
router.patch('/threads/:slug/replies/:replyId/react', reactToReply)

module.exports = router
