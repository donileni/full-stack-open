const Course = ({ course }) => {

  const total = course.parts.reduce((sum, order) => (sum + order.exercises), 0)

  return (
    <div>
      <h2>{ course.name }</h2>
      {course.parts.map(part =>
         <p key={ part.id }>{ part.name } { part.exercises }</p>
         )}
      <b>total of exercises {total}</b>
    </div>
  )
}

export default Course