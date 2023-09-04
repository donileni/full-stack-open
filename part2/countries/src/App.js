import { useState, useEffect } from 'react'
import SearchModule from './components/search-module'
import Countries from './components/countries'
import countryServices from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryServices
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const handleFilterChange = (event) => (setFilter(event.target.value))

  let includedCountries = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))

  const handleClick = (buttonId) => {
    const currentCountry = includedCountries.filter(country => country.name.common === buttonId)
    setFilter(currentCountry[0].name.common)
  }

  return(
    <div>
      <SearchModule handleFilterChange={handleFilterChange}/>
      <Countries includedCountries={includedCountries} handleClick={handleClick}/>
    </div>
  )
}

export default App;
