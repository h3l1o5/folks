const Room = require("./models/Room")
const User = require("./models/User")
const uuid = require("uuid")

module.exports = io => {
  io.on("connection", socket => {
    console.log("a user connect")

    socket.on("disconnect", reason => {
      console.log("a user leave")
    })

    socket.on("join room", data => {
      // TODO: handle user join the room
    })

    socket.on("quit room", data => {
      // TODO: handle user quit the room
    })

    socket.on("enter room", data => {
      socket.join(data.roomId)
      console.log("a user enter room:" + data.roomId)
    })

    socket.on("leave room", data => {
      socket.leave(data.roomId)
      console.log("a user leave room:" + data.roomId)
    })

    socket.on("message", data => {
      socket.broadcast.to(data.roomId).emit("message", {
        id: data.messageId,
        createBy: data.createBy,
        createAt: data.createAt,
        content: data.content,
      })
      Room.findById(data.roomId, (err, room) => {
        if (err) {
          return socket.emit("error", err)
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
            socket.emit("error", err)
          })
      })
    })

    socket.on("position", data => {
      socket.broadcast.to(data.roomId).emit("position", {
        username: data.username,
        position: data.position,
      })
      User.findOne({ username: data.username }, (err, user) => {
        if (err) {
          return socket.emit("error", err)
        }
        console.log(user)
        user.lastPosition = data.position
        user
          .save()
          .then(() => {})
          .catch(err => {
            socket.emit("error", err)
          })
      })
    })
  })
}
