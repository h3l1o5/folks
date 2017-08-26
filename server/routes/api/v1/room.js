const router = require('express').Router()

const Room = require('../../../models/Room')

router.post('/', (req, res, next) => {
  const { title, createBy } = req.body
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