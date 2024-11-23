import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const unsortedAnecdotes = useSelector(state => {
      if (state.filter === '') {
        return state.anecdotes
      }
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const anecdotes = [...unsortedAnecdotes].sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const newVote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted for '${anecdote.content}'`))

        setTimeout(() => {
          dispatch(resetNotification())
        }, 5000);
      }

    return(
        <div>
             {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => newVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList