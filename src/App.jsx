import { useState, useEffect } from "react";
import InfoCards from "./components/infoCards";
import ForecastTable from "./components/forecastTable";
import "./App.css";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [zipCode, setZipCode] = useState("95014"); 
  const [weatherInfo, setWeatherInfo] = useState({
    cityName: "",
    timeZone: "",
    temp: "",
    clouds: "",
    weatherDes: "",
  });
  const [forecastTable, setForecastTable] = useState(null);
  const [tempFilter, setTempFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  
  

  useEffect(() => {
    const fetchForecastData = async () => {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${zipCode}&key=${API_KEY}`
      );
      const json = await response.json();
      setForecastTable(json);
    };
    fetchForecastData().catch(console.error);
  }, [zipCode]);

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?postal_code=${zipCode}&key=${API_KEY}`
      );

      const json = await response.json();
      console.log(json);
      setWeatherInfo({
        cityName: json.data[0]["city_name"],
        timeZone: json.data[0]["timezone"],
        temp: json.data[0]["temp"],
        clouds: json.data[0]["clouds"],
        weatherDes: json.data[0]["weather"].description,
      });
    };
    fetchCurrentWeatherData().catch(console.error);
  }, [zipCode]);

  const changedZipCodeHandler = (event) => {
    if (event.target.value == "") {
      setZipCode("10036");
    }
    setZipCode(event.target.value);
  };

  const filteredData = forecastTable?.data.filter(
    (item) =>
      (tempFilter === "" || Number(item.max_temp) === Number(tempFilter)) &&
      (dateFilter === "" || item.valid_date === dateFilter)
  );
  

  return (
    <div className="whole-page">
      <div className="header">
        <h4>
        <FontAwesomeIcon icon={faCloudSunRain} /> The Weather Tracker
        </h4>
        <label>Enter zipCode</label>
        <br />
        <input
          type="text"
          placeholder="Zipcode ..."
          onChange={changedZipCodeHandler}
        />
        <br />
        <br />
        <label>Temperature:</label>
        <br />
          <input
            type="text"
            placeholder="Filter by Temperature ..."
            value={tempFilter}
            onChange={(e) => setTempFilter(e.target.value)}
          />
        <br />
        <br />
        <label>Date:</label>
        <br />
        <input
            type="text"
            placeholder="Filter by Date ..."
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="main-page">
        <h2> <FontAwesomeIcon icon={faCloudSunRain} /> Welcome to the Weather Tracker!</h2>
        <InfoCards
          cityName={weatherInfo.cityName}
          timeZone={weatherInfo.timeZone}
          temp={weatherInfo.temp}
          weatherDes={weatherInfo.weatherDes}
          clouds={weatherInfo.clouds}
        />
       <ForecastTable list={{ ...forecastTable, data: filteredData }} />
      </div>
      
    </div>
  );
}

export default App;