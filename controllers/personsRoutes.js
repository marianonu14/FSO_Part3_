const router = require('express').Router()

const Person = require('../models/person')
const logger = require('../utils/logger')

router.get('/', (req, res) => {
  Person.find({}).then((result) => {
    res.send(result)
  })
})

router.get('/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) return res.status(404).end()
      res.send(person)
    })
    .catch((err) => {
      logger.error(err)
      res.status(500).end()
    })
})

router.post('/', (req, res) => {
  const { name, number } = req.body

  if (!name || !number)
    return res.status(404).send('Name and Number is Required')

  const object = new Person({
    name: name,
    number: number,
  })

  object
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => logger.error(err))
})

router.put('/:id', (req, res) => {
  const { name, number } = req.body

  const updatePerson = {
    name: name,
    number: number,
  }

  Person.findByIdAndUpdate(req.params.id, updatePerson, { new: true })
    .then((updatePerson) => {
      res.json(updatePerson)
    })
    .catch((error) => logger.error(error))
})

router.delete('/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).send(result)
    })
    .catch((error) => logger.error(error))
})

module.exports = router
