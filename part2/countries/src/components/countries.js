import Country from "./country"

const Countries = (props) => {

    if (props.includedCountries.length > 10) {
        return (
            <div>To many matches, specify another filter</div>
        )
    }

    if (props.includedCountries.length === 1) {
        return(
            <div>
                <Country key={props.includedCountries[0].id} name={props.includedCountries[0].name.common} 
                capital={props.includedCountries[0].capital} area={props.includedCountries[0].area} 
                languages={props.includedCountries[0].languages} flag={props.includedCountries[0].flags}/>
            </div>
        )
    }
    
    return (
        <div>
            {props.includedCountries.map(country => 
                <Country key={country.id} name={country.name.common} number='multiple' capital={country.capital}
                area={country.area} languages={country.languages} flag={country.flags}/>)}
        </div>
    )
}

export default Countries