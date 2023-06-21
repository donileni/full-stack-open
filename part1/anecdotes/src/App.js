import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  console.log("here")

  const initalPoints = Array(8).fill(0)
  
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initalPoints)
  const [mostVotes, setMostVotes] = useState(0)
  console.log("Points: " + points)

  const handleSelected = () => {
    const max = anecdotes.length
    const index = Math.floor(Math.random() * max)
    setSelected(index)
  }

  const handleVote = () => {
    const copy = [...points]
    const index = anecdotes.indexOf(anecdotes[selected])
    
    copy[index] += 1
    handleMostVotes(copy)
    
  }

  const handleMostVotes = (localPoints) => {
    let mostVotes = localPoints[0]

    for (let i = 0; i < localPoints.length; i++) {
      if (mostVotes < localPoints[i]) {
        mostVotes = localPoints[i]
      }
    }

    console.log("most votes after: " + mostVotes)
    let voteIndex = localPoints.indexOf(mostVotes)
    console.log("index with most votes: " + voteIndex)

    setMostVotes(voteIndex)
    setPoints(localPoints)
    console.log(points)
  }

  return (
    <div>
      <h1>Anedote of the day</h1>
      {anecdotes[selected]}
      <div>
        <Button handleClick={() => handleVote()} text="vote" />
        <Button handleClick={() => handleSelected()} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
    </div>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

export default App