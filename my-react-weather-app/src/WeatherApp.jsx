import React, {useState} from "react";

// our open weather api key
const API_KEY = "0b27dee62b5909ebbbf9788a2e85e2b2";

function WeatherApp() {
    return(
        <div className="weather-container">
            <form className="weather-form">
                <input type="text" className="cityInput" placeholder="Enter City"></input>
                <button type="submit">Get Weather</button>
            </form>
            <div className="weather-card">
                <h1 className="cityDisplay">Miami</h1>
                <p className="locDisplay">25.7743, -80.1937</p>
                <p className="tempDisplay">90°</p>
                <p className="realFeelDisplay">Real Feel: 92°</p>
                <p className="windSpeedDisplay">Wind Speed: ↘ 3.09m/s</p>
                <p className="humidityDisplay">Humidity: 75%</p>
                <p className="descDisplay">Clear Skies</p>
                <p className="weatherEmoji">☀️</p>
                <p className="errorDisplay">Please Enter A City</p>
            </div>
        </div>
    );
}

export default WeatherApp