const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Room = require('../../../models/Room')
const authenticate = require('../../../middlewares/authenticate')

router.use(authenticate)

router.get('/', (req, res, next) => {
  setTimeout(() => {
    Room.find({}, (err, rooms) => {
      if (err) { next(err) }
      res.json({ rooms })
    })
  }, 1000)
})

router.post('/', (req, res, next) => {
  const { title } = req.body
  const createBy = req.currentUser.username

  const newRoom = new Room({
    title,
    createBy,
    userGroup: [ createBy ],
    messages: []
  })

  newRoom.save()
         .then(() => { res.json({ success: true }) })
         .catch((err) => { next(err) })
})

module.exports = router