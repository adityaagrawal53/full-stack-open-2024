import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnec(content))
    dispatch(setNotif(`Anecdote '${content}' was created`))
  }

  return (
    <div>
      <h2>
        create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm