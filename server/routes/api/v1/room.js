const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Room = require('../../../models/Room')
const authenticate = require('../../../middlewares/authenticate')

router.use(authenticate)

router.post('/', (req, res, next) => {
  const { title } = req.body
  const createBy = req.currentUser._id

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