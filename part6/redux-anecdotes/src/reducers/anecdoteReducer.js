import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    newAnecdote(state, action) {
      return state.concat(asObject(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
    
  }
})

export const { newVote, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer