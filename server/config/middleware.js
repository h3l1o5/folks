const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')

const apiRoute = require('../routes/api/v1')

module.exports = app => {
  app.use(express.static(path.join(__dirname, '/../../build')))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(logger(process.env.NODE_ENV === 'production' ? 'common' : 'dev'))

  app.use('/api/v1/', apiRoute)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../build/index.html'))
  })

  app.use((err, req, res, next) => {
    res.status(500)
    res.send(err.message)
  })
}
