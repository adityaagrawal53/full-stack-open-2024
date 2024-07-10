import axios from 'axios'

export const getAnecs = async () =>
  await axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const postAnec = async (anecdote) => {
  await axios.post('http://localhost:3001/anecdotes', anecdote).then(res => res.data)
}

export const updateAnec = async (anecdote) => {
  await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote).then(res => res.data)
}