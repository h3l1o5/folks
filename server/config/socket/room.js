const uuid = require('uuid')

const Room = require('../../models/Room.js')

module.exports = socket => {
  socket.on('join room', data => {
    // create a system message
    const message = {
      messageId: uuid.v4(),
      createBy: 'system',
      createAt: Date.now(),
      content: `${data.username} joined this room!`,
    }
    Room.findById(data.roomId, (err, room) => {
      if (err || !room) {
        return socket.emit('error', err)
      }
      // save new member and system message to db
      room.members.push(data.username)
      room.messages.push(message)
      room
        .save()
        .then(() => {
          // after saving, use socket to ask all members in this room to update currentRoom data
          socket.broadcast
            .to(data.roomId)
            .emit('update currentRoom', { roomId: data.roomId })
        })
        .catch(err => {
          socket.emit('error', err)
        })
    })
  })

  socket.on('quit room', data => {
    // TODO: handle user quit the room
  })

  socket.on('enter room', data => {
    socket.join(data.roomId)
    console.log(`a user enter room:${data.roomId}`)
  })

  socket.on('leave room', data => {
    socket.leave(data.roomId)
    console.log(`a user leave room:${data.roomId}`)
  })
}
