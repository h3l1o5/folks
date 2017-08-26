const express = require('express')

const users = require('./users')
const auth = require('./auth')
const room = require('./room')

const router = express.Router()

router.use('/users', users)
router.use('/auth', auth)
router.use('/room', room)

module.exports = router
