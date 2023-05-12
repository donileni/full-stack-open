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

const Display = (props) => {
  return (
    <div>
    <div>good {props.good}</div>
    <div>neutral {props.neutral}</div>
    <div>bad {props.bad}</div>
  </div>
  )
}

const Statistics = (props) => {
  return (
    <div> 
      <div>all {props.all}</div>
      <div>average {props.average}</div>
      <div>positive {props.positive}</div>
    </div>
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
      <Display good={good} neutral={neutral} bad={bad} />
      <Statistics all={all} average={average} positive={positive} />
    </div>
  )
}

export default App