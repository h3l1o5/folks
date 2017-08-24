const express = require('express')
const path = require('path')
const router = express.Router()

const User = require(path.resolve('server', 'models', 'User.js'))

router.post('/', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  setTimeout(() => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { next(err) }
      if (user) {
        if (password === user.password) {
          res.json({ success: true })
        } else {
          res.status(403).json({ error: 'Incorrect username or password' })
        }
      } else {
        res.status(403).json({ error: 'Incorrect username or password' })
      }
    })
  }, 1000)
})

module.exports = router