import { useState, useEffect } from 'react'
import Filter from "./components/filter.js"
import PersonForm from "./components/person-form.js"
import Persons from "./components/persons.js"
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  }, [])

  const handleClick = (event) => {
    event.preventDefault()

    if (newNumber === '') {
      window.alert("add a number")
    }

    else if (newName === '') {
      window.alert("add a name")
    }

    else if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .addToList(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })

    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
     
      <h2>Add a new</h2>
      <PersonForm handleClick={handleClick} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App