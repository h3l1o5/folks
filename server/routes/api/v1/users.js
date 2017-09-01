const express = require("express")
const path = require("path")
const router = express.Router()

const User = require("../../../models/User")

router.post("/", (req, res, next) => {
  setTimeout(() => {
    User.findOne(
      { $or: [{ username: req.body.username }, { email: req.body.email }] },
      (err, user) => {
        if (err) {
          return next(err)
        }
        if (user) {
          const error = {}
          if (user.username === req.body.username) {
            error.code = "USERNAME"
            error.message = "This username is already existed"
            res.status(403).json({ error })
          } else {
            error.code = "EMAIL"
            error.message = "This email is already existed"
            res.status(403).json({ error })
          }
        } else {
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
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
      },
    )
  }, 1000)
})

module.exports = router
