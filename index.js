require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const Person = require('./personsdb');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/api', (req, res) => {
  res.send('Welcome to the Api Persons');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((result) => {
    res.send(result);
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) return res.status(404).end();
      res.send(person);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number)
    return res.status(404).send('Name and Number is Required');

  const object = new Person({
    name: name,
    number: number,
  });

  object.save().then((result) => {
    res.send(result);
  });
});

app.put('/api/persons/:id', (req, res) => {
  const { name, number } = req.body;

  const updatePerson = {
    name: name,
    number: number
  };

  Person.findByIdAndUpdate(req.params.id, updatePerson, { new: true })
    .then((updatePerson) => {
      res.json(updatePerson);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => console.log(error));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
