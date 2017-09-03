export default (socket, actions) => {
  socket.on('message', message => {
    actions.receiveMessage(
      message.id,
      message.createBy,
      message.createAt,
      message.content,
    )
  })
  socket.on('position', data => {
    actions.receivePosition(data.username, data.position)
  })
  socket.on('join', data => {
    // TODO: handle user join the room
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
}
