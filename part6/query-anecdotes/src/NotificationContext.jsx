import { createContext, useReducer } from 'react'

const anecdoteReducer = (state, action) => {
    console.log('state: ', state)
    switch (action.type) {
      case 'SET':
        return action.payload
      case 'RESET':
        return state = ''
      default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(anecdoteReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )

}

export default NotificationContext