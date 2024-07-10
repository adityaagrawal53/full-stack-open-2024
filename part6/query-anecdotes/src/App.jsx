import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecs, updateAnec } from './requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecMutation = useMutation({ 
    mutationFn: updateAnec,
    onSuccess: () => {      
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    console.log('vote')
  }

  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getAnecs,
    retry: 1
  })  
  console.log(JSON.parse(JSON.stringify(result)))
  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }
  if ( result.isError ) {    
    return <div>An error occured.</div>  
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
