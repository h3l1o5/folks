const router = require('express').Router()

const users = require('./users')
const auth = require('./auth')
const rooms = require('./rooms')
const room = require('./room')

router.use('/users', users)
router.use('/auth', auth)
router.use('/rooms', rooms)
router.use('/room', room)

module.exports = router
