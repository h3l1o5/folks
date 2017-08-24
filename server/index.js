const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const app = express()
const apiRoute = require('./routes/api/v1')

// db
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/folks')

// other middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// api routes
app.use('/api/v1/', apiRoute)

// normal routes
app.get('/app/', (req, res) => { res.sendFile(path.join(__dirname, '/../build/index.html')) })
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'views/index.html')) })

// static
app.use(express.static(path.join(__dirname, '/../build')))
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, '/../vendor')))

// 4xx 5xx
app.use((req, res) => {
  res.status(404)
  res.send('404 not found')
})
app.use((err, req, res, next) => {
  res.status(500)
  res.send(err.message)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log('\nserver listening on port ' + port + '\n')
})