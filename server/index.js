const express = require('express')
const socket = require('socket.io')

const dbConfig = require('./config/db')
const middlewareConfig = require('./config/middleware')
const serverConfig = require('./config/server')
const socketConfig = require('./config/socket')

/**
 * database
 */
dbConfig()

/**
 * express and middleware
 */
const app = express()
middlewareConfig(app)

/**
 * server
 */
const server = serverConfig(app)

/**
 * socket
 */
const io = socket.listen(server)
socketConfig(io)

const port = process.env.PORT || 3001
server.listen(port, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`\nserver listening on port ${port}\n`)
  }
})
