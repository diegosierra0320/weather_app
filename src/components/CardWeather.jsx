import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({lat, lon}) => {
  
  const [weather, setWeather] = useState()
  const [temperture, setTemperture] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  let today = new Date();
  let dayindex = today.getDay();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  let dayweek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday",];
  let MonthYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  

  useEffect(() => {
    if(lon){
      const APIkey = '4fb4a61c2fab06480404eda0e0da79d2'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
      
      axios.get(URL)
        .then(res => {
          setWeather(res.data)
        const temp = {
          celsius: `${Math.round(res.data.main.temp - 273.15)} ºC`,
          farenheit: `${Math.round((res.data.main.temp - 273.15) * 9/5 + 3)} ºF`
        }
        setTemperture(temp)
        setIsLoading(false)
      })
        .catch(err => console.log(err))
    } 
  }, [lat, lon])

  console.log(weather);

  const handleClic = () => {
    setIsCelsius(!isCelsius)
  }

  if(isLoading){
    return <LoadingScreen />
  }else{
    return (
      <div className='div_card'>
        <article className='card'>
            <h1 className='card_title'>Weather App</h1> <hr />
            <h2>{weather?.name}, {weather?.sys.country}</h2>
            <h4>{dayweek[dayindex]}, {day} {MonthYear[month]} {year}</h4>
            <h2>{hours}:{minutes}:{seconds}</h2>
            <hr />

            <div className='card_info'>
              <div className='card_temperture'>
                <p>{isCelsius ? temperture?.celsius : temperture?.farenheit}</p>
                <button className='card_btn' onClick={handleClic}>{isCelsius ? "Change to ºF": "Change to ºC"}</button>
              </div>
              
              <div className='card_clouds'>
                <img className='img_clouds' src={weather && `http://openweathermap.org/img/wn/${weather && weather?.weather[0].icon}@2x.png`} alt="" />
                <h3>{weather?.weather[0].description}</h3>
              </div>
            </div>

          <div>
            {/* <h2>{weather.timezone}</h2> */}
            <ul className='card_list'>
              <li><span>Wind Speed</span> <br /> {weather?.wind.speed} m/s</li> <hr />
              <li><span>Pressure</span> <br /> {weather?.main.pressure} hPa</li> <hr />
              <li><span>Clouds</span> <br /> {weather?.clouds.all} %</li>
            </ul>
          </div>

        </article>
      </div>
    )
  }
}

export default CardWeather