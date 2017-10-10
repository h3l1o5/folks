const Room = require('../models/Room')

module.exports = socket => {
  socket.on('message', data => {
    socket.broadcast.to(data.roomId).emit('message', {
      messageId: data.messageId,
      createBy: data.createBy,
      createAt: data.createAt,
      content: data.content,
    })
    Room.findById(data.roomId, (err, room) => {
      if (err || !room) {
        return socket.emit('error', err)
      }
      const newMessage = {
        id: data.messageId,
        createBy: data.createBy,
        createAt: data.createAt,
        content: data.content,
      }
      room.messages.push(newMessage)
      room
        .save()
        .then(() => {})
        .catch(err => {
          socket.emit('error', err)
        })
    })
  })
}
