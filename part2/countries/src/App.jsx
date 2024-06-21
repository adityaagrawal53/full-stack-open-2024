import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [filter, setFilter] = useState("")
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setButtonCountry(null)
  }

  const [countries, setCountries] = useState([])
  const [buttonCountry, setButtonCountry] = useState(null)
  const showCountry = (country) => {
    setButtonCountry(country)
  }

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
      .catch(error => console.log("I wasn't able to load the countries"))
  }, [])


  return (
    <div>
      show countries <input value={filter} onChange={handleFilterChange} />
      {buttonCountry === null ? (
        <FilterResult filter={filter} countries={countries} showCountry={showCountry} />) :
        (
          <div>
            <Country country={buttonCountry} />
          </div>
        )
      }

    </div>
  )
}


const FilterResult = ({ filter, countries, showCountry }) => {
  let filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filtered.length === 0) {
    return ("Your search yielded no results.")
  }
  else if (filtered.length === 1) {
    return (<Country country={filtered[0]} />)
  }
  else if (filtered.length <= 10) {
    return (<CountryList filtered={filtered} showCountry={showCountry} />)
  }
  else {
    return ("Too many matches, specify another filter")
  }

}

const CountryList = ({ filtered, showCountry }) => {


  return (
    <div>
      {filtered.map((country) =>
        <div key={country.ccn3}>
          {country.name.common}
          <button onClick={() => showCountry(country)}>show</button>
        </div>
      )}
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
        )
        setWeather(response.data)
      } catch (error) {
        console.log('Error fetching weather data')
      }
    }
    fetchWeather()
  }, [country.capital])


  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital} <br />
        area {country.area}</p>
      <b>Languages: </b>
      <ul>
        {Object.entries(country.languages).map(([key, lang]) => <li key={key}>{lang}</li>)}

      </ul>

      <img src={country.flags.png} alt={`${country.flags.alt}`} />
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          </p>
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App