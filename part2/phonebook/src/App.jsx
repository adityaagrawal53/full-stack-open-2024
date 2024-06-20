import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => ( <li key={person.id}>{person.name} {person.number}</li>))}
    </ul>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const handleNameChange = (event) => { setNewName(event.target.value); };

  const [newNumber, setNewNumber] = useState('');
  const handleNumberChange = (event) => { setNewNumber(event.target.value); };

  const [filterNumber, setFilterNumber] = useState('');
  const handleFilterChange = (event) => { setFilterNumber(event.target.value); };

  const what = () => {   
    //console.log('effect')    
    axios      
      .get('http://localhost:3001/persons')      
      .then(response => {        
        //console.log('promise fulfilled')        
        setPersons(response.data)      
      })  
  } 
  
  useEffect(what, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(_.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } 
    else {
      const newPerson = { name: newName, number: newNumber, id: 1 + Math.max(...persons.map(person => person.id)) };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    } 
  }

  const personsFiltered = persons.filter(person =>
    person.name.toLowerCase().includes(filterNumber.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterNumber={filterNumber} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personsFiltered} />
    </div>
  )
}

export default App;
