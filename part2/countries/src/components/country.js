import axios from "axios"
import { useEffect, useState } from "react"
const api_key = process.env.REACT_APP_WEATHER_KEY

const Country = (props) => {
    const {lng, lat, number} = props
    const [temp, setTemp] = useState('')
    const [wind, setWind] = useState('')
    const [symbol, setSymbol] = useState('01d')

    useEffect(() => {
        if (props.number === 'singular') {
            const apiCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
            axios.get(apiCall)
            .then(response => {
                setTemp(response.data.current.temp)
                setWind(response.data.current.wind_speed)
                setSymbol(response.data.current.weather[0].icon)
            })
        }
      }, [lat, lng, number, symbol])

    const allLanguages = Object.values(props.languages)
    
    if (props.number === 'singular') {
           
        return (
            <div>
                <h2>{props.name}</h2>
                <div>{props.capital}</div>
                <div>{props.area}</div>
    
                <h4>languages:</h4>
    
                <ul>
                    {allLanguages.map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={props.flag.png} alt=""></img>
    
                <h3>Weather in {props.capital}</h3>
                <div>temprature {temp} Celcius</div>
                <img src={`https://openweathermap.org/img/wn/${symbol}@2x.png`} alt="" ></img>
                <div>wind {wind} m/s</div>
    
            </div>
        )
    }

    if (props.number === 'multiple') {
        return (
            <div>
                <div>
                    {props.name}
                    <button onClick={props.handleClick}>show</button>
                </div>
            </div>
    
        )
    }
}

export default Country