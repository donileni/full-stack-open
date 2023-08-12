const Country = (props) => {

    const allLanguages = Object.values(props.languages)

    if (props.number === 'multiple') {
        return (
            <div>
                <div>
                    {props.name}
                </div>
            </div>
    
        )
    }

    return (
        <div>
            <h2>{props.name}</h2>
            <div>{props.capital}</div>
            <div>{props.area}</div>

            <h3>languages:</h3>

            <ul>
                {allLanguages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={props.flag.png} alt=""></img>

        </div>
    )
}

export default Country