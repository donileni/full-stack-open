import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
    
  }
})

export const { newVote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer