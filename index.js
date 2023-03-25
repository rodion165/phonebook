const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get("/info", (request, response) => {
	const date = new Date()
	response.send(`<h1>Phonebook has info for ${persons.length} people</h1> <h2>${date}</h2>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id) 
  const person = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const id = Math.floor(MathRandom()*1000)
  return id
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!req.body.name || !req.body.number) {
    return res.status(404).json({
      error: 'missing name or number'
    })
  }

  const person = {
    id: body.id,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)

  response.json(person)
})

const PORT =process.env.PORT || 3001

app.listen(PORT)
console.log(`Server running on port ${PORT}`)