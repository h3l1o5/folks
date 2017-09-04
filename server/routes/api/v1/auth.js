const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const User = require('../../../models/User')
const config = require('../../../config')

router.post('/', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  setTimeout(() => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err)
      }
      if (user) {
        user
          .checkPassword(password)
          .then(isMatch => {
            if (isMatch) {
              const token = jwt.sign(
                {
                  id: user._id,
                  username: user.username,
                },
                config.jwtSecret,
              )
              res.json({ token })
            } else {
              res.status(403).json({ error: 'Incorrect username or password' })
            }
          })
          .catch(err => {
            next(err)
          })
      } else {
        res.status(403).json({ error: 'Incorrect username or password' })
      }
    })
  }, 1000)
})

module.exports = router
