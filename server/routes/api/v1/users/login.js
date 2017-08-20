const express = require('express')
const path = require('path')
const router = express.Router()

const User = require(path.resolve('server', 'models', 'User.js'))

router.post('/', (req, res, next) => {
  const account = req.body.account
  const password = req.body.password

  User.findOne({ account: account }, (err, user) => {
    if (err) { next(err) }
    if (user) {
      if (password === user.password) {
        res.send('login OK')
      } else {
        res.status(403).send('bad password')
      }
    } else {
      res.status(403).send('user not found')
    }
  })
})

module.exports = router