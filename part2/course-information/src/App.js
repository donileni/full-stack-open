
const Course = ({ course }) => {

  return (
    <div>
      <h1>{ course.name }</h1>
      {course.parts.map(part =>
         <p key={ part.id }>{ part.name } { part.exercises }</p>
         )}
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  const total = course.parts.reduce((sum, order) => (sum + order.exercises), 0)

  return (
    <div>
      <Course key={course.id} course={course} />
      <b>total of exercises {total}</b>
    </div>
  )
}

export default App