import { useState } from "react"

/*Weather images*/
import search from "./assets/search.png"
import mainimg from "./assets/logo.png"
import humid from "./assets/humidity.png"
import winds from "./assets/wind.png"
import clear from "./assets/clear.png"
import clearnight from "./assets/clearnight.png"
import fewclouds from "./assets/fewclouds.png"
import fewcloudsnight from "./assets/fewcloudsnight.png"
import mist from "./assets/mist.png"
import mistnight  from "./assets/mistnight.png"
import rain from "./assets/rain.png"
import rainnight from "./assets/rainnight.png"
import shatter from "./assets/shatter.png"
import shatternight from "./assets/shatternight.png"
import showerrain from "./assets/showerrain.png"
import showerrainnight from "./assets/showerrainnight.png"
import snow from "./assets/snow.png"
import snownight from "./assets/snownight.png"
import thunderstrom from "./assets/thunderstrom.png"
import thunderstromnight from "./assets/thunderstromnight.png"

const Weatherapp = () => {
  const [degree,setDegree]=useState(0)
  const [city,setCity]=useState("Erode")
  const [lat,setLat]=useState(0)
  const [lon,setLon]=useState(0)
  const [country,setCountry]=useState("IN")
  const [humidity,setHumidity]=useState("0%")
  const [wind,setWind]=useState("0%")
  const [icon,setIcon]=useState(clear)
  const [loading,setLoading]=useState(false)
  const [cityfound,setCityFound]=useState(false)

  function handleSearch(e){
    setCity(e.target.value)
  }
  function handleEnter(e){
    if(e.key==="Enter"){
      weatherDetails()
    }
  }
  const weatherIcon={
    "01d":clear,
    "01n":clearnight,
    "02d":fewclouds,
    "02n":fewcloudsnight,
    "03d":shatter,
    "03n":shatternight,
    "04d":shatter,
    "04n":shatternight,
    "09d":showerrain,
    "09n":showerrainnight,
    "10d":rain,
    "10n":rainnight,
    "11d":thunderstrom,
    "11n":thunderstromnight,
    "13d":snow,
    "13n":snownight,
    "50d":mist,
    "50n":mistnight
  }
async function weatherDetails() {
  try {
    setLoading(true)
    const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff85f5a3c9d791571cc00274e1a7150b&units=Metric`);
    const data=await res.json();
    console.log(data)
    setCity(data.name)
    setDegree(data.main.temp)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setLon(data.coord.lon)
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    const weatherIcons=data.weather[0].icon
    setIcon(weatherIcon[weatherIcons] || clear)
    setLoading(false)
  } catch (error) {
    console.error("Error occuring during api fetching",error.message)
  }
  finally{
  } 
}
  return (
    <>
    <div className="main">
      <div className="submain">
        <div className="searchbox">
          <input type="text" className="border-1 search-content" onChange={handleSearch} onKeyDown={handleEnter}/>
          <button><img src={search} className="w-5 hover:cursor-pointer" onClick={weatherDetails}/></button>
        </div>
        <div className="weather-images w-40">
          <img src={icon}/>
        </div>
      <div className="degree_city_country">
        <p>{degree}°C</p>
        <p>{city}</p>
        <p>{country}</p>
      </div>
      <div className="lan_lon">
        <div className="lati flex-col text-center">
        <p>Latitude</p>
        <p>{lat}</p>
        </div>
        <div className="long flex-col text-center">
        <p>Longitude</p>
        <p>{lon}</p>
        </div>
      </div>
      <div className="humi_wind">
        <div className="humidity">
          <img src={humid} className="w-15"/>
          <p>{humidity}</p>
          <p>Humidity</p>
        </div>
        <div className="wind_speed">
          <img src={winds} className="w-15"/>
          <p>{wind}</p>
          <p>Wind speed</p>
        </div>
      </div>
      <div className="wind_speed w-full text-center">
        <p>Designed by <a href="https://tamilmuhilan.netlify.app">@developertamil</a></p>
      </div>
      <div className="loading text-center">
        {loading && <p>please wait...</p>}
      </div>
      <div className="cityfound text-center">
        {cityfound && <p>City Not Found</p>}
      </div>
      </div>
    </div>
    </>
  )
}

export default Weatherapp
