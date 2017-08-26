const express = require('express')

const users = require('./users')
const auth = require('./auth')
const rooms = require('./rooms')

const router = express.Router()

router.use('/users', users)
router.use('/auth', auth)
router.use('/rooms', rooms)

module.exports = router
