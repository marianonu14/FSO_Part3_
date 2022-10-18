const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./utils/logger')
const config = require('./utils/config')

const personRoutes = require('./controllers/personsRoutes')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use('/api/persons', personRoutes)

app.get('/api', (req, res) => {
  res.send('Welcome to the Api Persons')
})

app.listen(config.PORT, () => {
  logger.info(`App listening on port ${config.PORT}`)
})
