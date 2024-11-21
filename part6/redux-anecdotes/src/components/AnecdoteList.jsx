import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
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

    const vote = (id) => {
        console.log('vote', id)
        dispatch(newVote(id))
        
        const notificationContet = anecdotes.filter(anecdote => anecdote.id === id)[0].content
        dispatch(setNotification(`you voted for '${notificationContet}'`))

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
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList