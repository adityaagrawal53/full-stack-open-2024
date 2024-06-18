import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({title, anecdote, vote}) => { 
  return ( 
    <> 
    <h1>{title}</h1>
      {anecdote}
    <br/>
      has {vote} votes
    <br/>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * (anecdotes.length)))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomAnecdote = () => { 
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
  }

  const voteAnecdote = () => { 
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }


  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} vote={votes[selected]}/>
      <Button text="vote" handleClick={voteAnecdote}/>
      <Button text="next anecdote" handleClick={randomAnecdote}/>
      <Anecdote title="Anecdote with the most votes" anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} vote={votes[votes.indexOf(Math.max(...votes))]}/>
    </div>
  )
}

export default App