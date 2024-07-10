import { useSelector, useDispatch } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    ).sort((a, b) => b.votes - a.votes)
  )

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnec(id))
    dispatch(setNotif(`you voted '${anecdotes.find(a => a.id === id).content}'`))
  }

  return (anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList