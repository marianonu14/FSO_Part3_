const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('DB Connected')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    require: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
