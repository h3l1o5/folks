const router = require('express').Router()
const mongoose = require('mongoose')

const authenticate = require('../../../middlewares/authenticate')
const Room = require('../../../models/Room.js')

router.use(authenticate)

router.post('/:roomId/members', (req, res, next) => {
  const roomId = req.params['roomId']
  const newMember = req.body.username
  
  Room.findById(roomId, (err, room) => {
    if (err) { return next(err) }
    if (!room) {
      res.status(404).json({ error: 'room not found' })
    } else {
      room.members.push(newMember)
      room.save()
          .then(() => res.json({ success: true }))
          .catch((err) => { next(err) })
    }
  })
})

module.exports = router