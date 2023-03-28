require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./moduls/persons')


app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))



let persons = []
app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(persons)
  })
})

app.get("/info", (request, response) => {
	const date = new Date()
	response.send(`<h1>Phonebook has info for ${persons.length} people</h1> <h2>${date}</h2>`)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result =>{
      response.status(204).end()
    })
    .catch(error => console.error)
})

const generateId = () => {
  const id = Math.floor(Math.random()*1000)
  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!request.body.name || !request.body.number) {
    return response.status(404).json({
      error: 'missing name or number'
    })
  }
  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})