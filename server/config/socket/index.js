const mountRoomListeners = require('./room')
const mountMessageListeners = require('./messenge')
const mountMapListeners = require('./map')

module.exports = io => {
  io.on('connection', socket => {
    mountRoomListeners(socket)
    mountMessageListeners(socket)
    mountMapListeners(socket)
  })
}
