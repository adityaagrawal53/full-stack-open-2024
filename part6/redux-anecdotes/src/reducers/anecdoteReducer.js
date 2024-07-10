import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload
      const oldAnec = state.find(n => n.id === id)
      const newAnec = { ...oldAnec, votes: oldAnec.votes + 1 }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : newAnec
      )
    },
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnec(state, action) {
      return action.payload
    }

  }
})

export const initAnec = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnec(anecdotes))
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.create(content)
    dispatch(appendAnec(newAnec))
  }
}

export const voteAnec = (id) => {
  return async dispatch => {
    await anecdoteService.update(id)
    dispatch(incrementVote(id))
  }
}




export const { incrementVote, setAnec, appendAnec } = anecdoteSlice.actions
export default anecdoteSlice.reducer 