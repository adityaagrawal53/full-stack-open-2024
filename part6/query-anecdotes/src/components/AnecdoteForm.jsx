import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { postAnec } from "../requests"


const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({ 
    mutationFn: postAnec,
    onSuccess: () => {      

      queryClient.invalidateQueries('anecdotes')
    }
  })

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({content, id: (100000 * Math.random()).toFixed(0), votes: 0}) 
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnec}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
