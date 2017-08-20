const express = require('express')
const path = require('path')
const router = express.Router()

const User = require(path.resolve('server', 'models', 'User.js'))

router.post('/', (req, res, next) => {
  console.log(path.resolve('server', 'models', 'User.js'))
  User.findOne({ account: req.body.account }, (err, user) => {
    if (err) { next(err) }
    if (user) {
      res.send('account already existed')
    }

    const newUser = new User({
      account: req.body.account,
      password: req.body.password,
      displayName: req.body.displayName,
      gender: req.body.gender
    })

    newUser.save()
      .then(() => { res.send('signup OK') })
      .catch((err) => { next(err) })
  })
})

module.exports = router