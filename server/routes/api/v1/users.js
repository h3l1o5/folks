const express = require('express')
const path = require('path')
const router = express.Router()

const User = require('../../../models/User')

router.post('/', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) { next(err) }
    if (user) {
      res.json({ error: 'BAD_USERNAME' })
    } else {

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
  
      newUser.save()
             .then(() => { res.json({ success: true }) })
             .catch((err) => { next(err) })
    }
  })
})

module.exports = router