import { useSelector } from 'react-redux'

const Notification = () => {
  let visible = 'none'
  const notification = useSelector(state => state.notification)

  if (notification !== '') {
    visible = 'block'
  }

  console.log('notification: ', notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visible
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification