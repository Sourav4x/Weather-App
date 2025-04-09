import './App.css';
import {Search, MapPin, Wind} from 'react-feather';
import getWeather from './api/api';
import { useState } from 'react';
import dateFormat from 'dateformat';

function App() {

  const [city,setCity] = useState("");
  const [weather,setWeather] = useState({}); 
  const [darkMode, setDarkMode] = useState(false);

                                                          //using state hooks as mentioned mam/sir

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity(""); 
  }

  const myDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
    <button onClick={() => setDarkMode(!darkMode)} className="drk-wht-but">
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>


      <h1>My Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} 
        placeholder='Enter City Name' />
        <button onClick={()=>getWeatherbyCity()}>
          <Search></Search>
        </button>
      </div>

      {weather && weather.weather && 
      <div className="content">
        
        <div className="location d-flex">
          <MapPin></MapPin>
          <h1>{weather.name} <span>({weather.sys.country})</span></h1>
        </div>
        <p className="datetext">{myDate()}</p>

        <div className="weatherdesc d-flex flex-c">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <h3>{weather.weather[0].description}</h3>
        </div>

        <div className="tempstats d-flex flex-c">
          <h1>{weather.main.temp} <span>&deg;C</span></h1>
          <h3>Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
          <h3>Humidity: {weather.main.humidity}%</h3>
          <h3>Weather Condition in {weather.name}: <b>{weather.weather[0].main}</b></h3>
        </div>

        <div className="windstats d-flex">
          <Wind></Wind>
          <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
        </div>

      </div>
                                                             
      }

      {!weather.weather && <div className="content">
        <h4>No City Found ! Try again</h4>
      </div>}

    

    </div>
  );
}

export default App;