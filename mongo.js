const mongoose = require('mongoose')

if (process.argv.length>5) {
  console.log('remove the first and last name in one quotation marks')
  process.exit(1)
}

const password = process.argv[2]


const url =
    `mongodb+srv://rodionkonst165:${password}@cluster0.h5zmluj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person ({
  name:process.argv[3],
  number:process.argv[4]
})
person.save().then(result => {
  console.log(`added ${person.name} ${person.number} to phonebook`)
  mongoose.connection.close()
})