import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = (props) =>  {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return(
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </div>

  )
}

const StatisticLine = (props) => {
  return (
      <div>{props.text} {props.value}</div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const updatedAll = all + 1
    setAll(updatedAll)
    const updatedGood = good + 1
    setGood(updatedGood)
    setAverage((updatedGood - bad)/updatedAll)
    setPositive(updatedGood/updatedAll)
  }

  const handleBadClick = () => {
    const updatedAll = all + 1
    setAll(updatedAll)
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAverage((good - updatedBad)/updatedAll)
    setPositive(good/updatedAll)
  }

  const handleNeutralClick = () => {
    const updatedAll = all + 1
    setAll(updatedAll)
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setPositive(good/updatedAll)
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => handleGoodClick()} text="good" />
      <Button handleClick={() => handleNeutralClick()} text="neutral" />
      <Button handleClick={() => handleBadClick()} text="bad" />
      <Header text="statistics"/>
      <Statistics all={all} good={good} neutral={neutral} bad={bad} average={average} positive={positive} />
    </div>
  )
}

export default App