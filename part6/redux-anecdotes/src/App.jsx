import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initAnec } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnec())
  }, [dispatch])
  
  return (
    <div>
      
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App