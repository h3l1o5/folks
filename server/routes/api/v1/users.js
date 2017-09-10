const express = require('express')

const router = express.Router()

const User = require('../../../models/User')

router.post('/', (req, res, next) => {
  setTimeout(() => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        return next(err)
      }
      if (user) {
        const error = {
          code: 'USERNAME',
          message: 'This username is already existed',
        }
        res.status(403).json({ error })
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
        })
        newUser
          .save()
          .then(() => {
            res.json({ success: true })
          })
          .catch(err => {
            next(err)
          })
      }
    })
  }, 1000)
})

module.exports = router
