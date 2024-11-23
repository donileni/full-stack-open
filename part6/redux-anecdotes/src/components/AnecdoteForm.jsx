import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import noteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const anecdote = await noteService.createNew(content)

        dispatch(newAnecdote(anecdote))

        dispatch(setNotification(`you created anecdote '${content}'`))

        setTimeout(() => {
          dispatch(resetNotification())
        }, 5000);
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm