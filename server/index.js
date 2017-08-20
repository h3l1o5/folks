const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const app = express()
const apiRoute = require('./routes/api/v1')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/folks')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../build')))
  app.use('/', (req, res) => { res.sendFile(path.join(__dirname, '/../dist/app.html')) })
}

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1/', apiRoute)



app.use((req, res) => {
  res.status(404)
  res.send('404 not found')
})
app.use((err, req, res, next) => {
  res.status(500)
  res.send(err)
})
app.listen(process.env.PORT || 8000)