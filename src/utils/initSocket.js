export default (socket, actions) => {
  socket.on('message', message => {
    actions.addMessage(message)
  })
  socket.on('position', data => {
    actions.updatePosition(data.username, data.position)
  })
  socket.on('update currentRoom', data => {
    actions.fetchAndSetCurrentRoom(data.roomId)
  })

  socket.on('quit', data => {
    // TODO: handle user quit the room
  })

  socket.on('enter', data => {
    // TODO: handle member enter the room
  })

  socket.on('leave', data => {
    // TODO: handle member leabe the room
  })

  socket.on('err', err => {
    console.error(err)
  })
}
