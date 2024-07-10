import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, asObject(anecdote))
  return response.data
}

const update = async (id) => { 
  const oldAnec = await axios.get(`${baseUrl}/${id}`).then(response => response.data)
  const newAnec = { ...oldAnec, votes: oldAnec.votes + 1 }
  return axios.put(`${baseUrl}/${id}`, newAnec).then(response => response.data)
}

export default { getAll, create, update }