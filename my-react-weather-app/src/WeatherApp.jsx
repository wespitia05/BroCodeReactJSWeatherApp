import React, {useState, useRef} from "react";

// our open weather api key
const API_KEY = "0b27dee62b5909ebbbf9788a2e85e2b2";

function WeatherApp() {
    // our constants with the setter functions as well, initial state is an empty string
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const cityInputRef = useRef(null);

    // this function will handle what happens after we press the submit button
    async function handleSubmit(e) {
        // prevents form to refresh after pressing submit button
        e.preventDefault();

        // check if nothing is inputted, or if a whitespace input is present
        if (!city.trim()) {
            displayError("Please Enter a City");
            console.log("Please Enter a City");
            return;
        }

        setError(""); // clear any old errors

        // if something is inputted, try to get the data based on the city inputted
        try {
            // create constant data to wait for the getWeatherData to return info
            const data = await getWeatherData(city.trim());
            // if we get data back, call the displayWeatherInfo function to display it
            displayWeatherInfo(data);
            console.log(data);
        }
        // catch any errors and display them
        catch (err) {
            displayError("Could Not Fetch Weather");
            console.error("Could Not Fetch Weather");
        }
    }

    // this function will handle getting the city inputted and return the data
    // our parameter will be city
    async function getWeatherData(city) {
        // this url is what we will pas to get data on the city inputted
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        // response fetches the url for the specified city inputted
        const response = await fetch(apiUrl);

        // if the response is not ok, display the error message
        if(!response.ok) {
            throw new Error("Could Not Fetch Weather Data");
            console.log("Could Not Fetch Weather Data");
        }

        // at the end of this function, return the response in a json object
        const data = await response.json();
        return data;
    }

    // this function will gather specific data and display it
    function displayWeatherInfo(data) {
        // clear any previous error
        setError("");

        // destructure our data
        const {
            name,
            coord: {lat, lon},
            main: {temp, feels_like, humidity},
            weather: [{id, description}],
            wind: {speed, deg}
        } = data;

        // constants for our helper functions
        const tempF = kelvToFaren(temp);
        const feelsLikeF = kelvToFaren(feels_like);
        const windDirection = getWindDirection(deg);
        const emoji = getWeatherEmoji(id);

        // store all our values in the set weather state
        setWeather({
            city: name,
            lat, lon,
            temp: tempF,
            feelsLike: feelsLikeF,
            windSpeed: speed,
            windDirection,
            humidity,
            description,
            emoji
        });
    }

    // this function will return the fahrenheit value from kelvin
    function kelvToFaren(k) {
        return (((k - 273.15) * 9) / 5 + 32).toFixed(0);
    }

    // this function will get the specific emoji for the weather id and return it
    function getWeatherEmoji(weatherId) {
        if (weatherId >= 200 && weatherId < 300) {
            return "⛈️"; // Thunderstorm
        }
        else if (weatherId >= 300 && weatherId < 400) {
            return "🌦️"; // Drizzle
        }
        else if (weatherId >= 500 && weatherId < 600) {
            return "🌧️"; // Rain
        }
        else if (weatherId >= 600 && weatherId < 700) {
            return "❄️"; // Snow
        }
        else if (weatherId >= 700 && weatherId < 800) {
            return "🌫️"; // Fog / Haze
        }
        else if (weatherId === 800) {
            return "☀️"; // Clear sky
        }
        else if (weatherId > 800) {
            return "☁️"; // Clouds
        }
        else {
            return "❓";
        }
    }

    // this function will determine the direction the wind is blowing based on degree
    function getWindDirection(deg) {
        if (deg >= 337.5 || deg < 22.5) {
            return "↑";
        }
        else if (deg >= 22.5 && deg < 67.5) {
            return "↗";
        }
        else if (deg >= 67.5 && deg < 112.5) {
            return "→";
        }
        else if (deg >= 112.5 && deg < 157.5) {
            return "↘";
        }
        else if (deg >= 157.5 && deg < 202.5) {
            return "↓";
        }
        else if (deg >= 202.5 && deg < 247.5) {
            return "↙";
        }
        else if (deg >= 247.5 && deg < 292.5) {
            return "←";
        }
        else if (deg >= 292.5 && deg < 337.5) {
            return "↖";
        }
        else {
            return "•";
        }
    }

    // this function will display any potential error messages
    function displayError(message) {
        setWeather(null); // hides any old weather that might be present
        setError(message); // shows error in html
    }

    return(
        <div className="weather-container">
            <form className="weather-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="cityInput" 
                    placeholder="Enter City" 
                    ref={cityInputRef} 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}>
                </input>
                <button type="submit">Get Weather</button>
            </form>
            <div className="weather-card" >
                {weather && (
                    <>
                    <h1 className="cityDisplay">{weather.city}</h1>
                    <p className="locDisplay">
                        {weather.lat}, {weather.lon}
                    </p>
                    <p className="tempDisplay">{weather.temp}°F</p>
                    <p className="realFeelDisplay">Real Feel: {weather.feelsLike}°F</p>
                    <p className="windSpeedDisplay">
                        Wind Speed: {weather.windDirection} {weather.windSpeed}m/s
                    </p>
                    <p className="humidityDisplay">Humidity: {weather.humidity}%</p>
                    <p className="descDisplay">{weather.description}</p>
                    <p className="weatherEmoji">{weather.emoji}</p>
                    </>
                )}
                {error && <p className="errorDisplay">{error}</p>}
            </div>
        </div>
    );
}

export default WeatherApp