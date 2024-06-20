import { useState, useEffect } from 'react'
import personsService from "./services/persons"

const Notification = ({ notification, style }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={style}>
      {notification}
    </div>
  )
}

const Filter = ({ filterNumber, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filterNumber} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>)}
    </ul>)
}

const Person = ({ person, deletePerson }) => { 
  return (
    <li>
        {person.name} {person.number}
        <button onClick={deletePerson}>delete</button>
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => { setNewName(event.target.value) }

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }

  const [filterNumber, setFilterNumber] = useState('')
  const handleFilterChange = (event) => { setFilterNumber(event.target.value) }

  const [style, setStyle] = useState('error')

  const [notification, setNotification] = useState(null)
  const notifyGood = (message) => { 
    setNotification( message)
    setStyle('good')   
    setTimeout(() => {
      setNotification(null)        
    }, 5000)
  }
  const notifyError = (message) => { 
    setNotification( message ) 
    setStyle('error')       
    setTimeout(() => {          
      setNotification(null)        
    }, 5000)
  }

  useEffect(() => {
    const nonExisting = {
      id: 10000,
      name: 'fake',
      number: '1234',
    }
    personsService.getAll()
      .then(persons => {
        setPersons(persons.concat(nonExisting))
      })
      .catch(error => {
        notifyError(`We were unable to load the phonebook. Oops!'`)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const oldPerson = persons.find(person => person.name === newName)
    if (oldPerson) {
      //alert(`${newName} is already added to phonebook`)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updated = {...oldPerson, number: newNumber}
        personsService.update(oldPerson.id, updated)
          .then( response => { 
            setPersons(persons.map(person => person.id !== oldPerson.id ? person : response))
            setNewName('')
            setNewNumber('')
            notifyGood(`Successfully updated ${oldPerson.name} with new number`)
          })
          .catch(error => {
            notifyError(`We were not able to find ${oldPerson.name} on the server.`)
            setPersons(persons.filter(n => n.id !== oldPerson.id)) 
          })
          
      }
    }
    else {
      const newPerson = { name: newName, number: newNumber }
      personsService
        .create(newPerson)
        .then(response => {
          //console.log(response)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          notifyGood(`Successfully added ${newName}.`)        
        })
        .catch(error => {
          notifyError(`We were not able to create a contact for ${newName}.`) 
          // maybe re-get the details from json server here?  
        })
    }
  }

  const deletePerson = (id) => { 
    if (window.confirm("Are you sure you want to delete this person?")) { 
      personsService.delete_(id).then(() => { 
        setPersons(persons.filter(person => person.id !== id))
        notifyGood(`Successfully deleted the contact with id '${id}'`)
      })
      .catch(error => {
        notifyError(`We were not able to find a contact for id '${id}.'`) 
        setPersons(persons.filter(n => n.id !== id))        
      })
    }
  }


  const personsFiltered = persons.filter(person =>
    person.name.toLowerCase().includes(filterNumber.toLowerCase())
  )

  return (
    <div>
      <Notification notification={notification} style={style}/>
      <h2>Phonebook</h2>
      <Filter filterNumber={filterNumber} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personsFiltered} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
