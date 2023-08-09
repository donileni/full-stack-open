import { useState, useEffect } from 'react'
import SearchModule from './components/search-module'
import Countries from './components/countries'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const includedCountries = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))

  return(
    <div>
      <SearchModule handleFilterChange={handleFilterChange}/>
      <Countries />
    </div>
  )
}

export default App;
