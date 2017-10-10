const User = require('../../models/User')

module.exports = socket => {
  socket.on('position', data => {
    socket.broadcast.to(data.roomId).emit('position', {
      username: data.username,
      position: data.position,
    })
    User.findOne({ username: data.username }, (err, user) => {
      if (err || !user) {
        return socket.emit('error', err)
      }
      user.lastPosition = data.position
      user
        .save()
        .then(() => {
          console.log('position updated')
        })
        .catch(err => {
          socket.emit('error', err)
        })
    })
  })
}
