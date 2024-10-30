async function fetchWeather() {
    const location = document.getElementById('location').value;
    const apiKey = 'cd4a6d26a33a4d7ebdb50302243010'; // replace with your actual WeatherAPI key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Location not found");
        }
        
        const data = await response.json();
        console.log(data);
        
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherDisplay').innerText = error.message;
    }
}

function displayWeather(data) {
    const { location, current } = data;
    const weatherDisplay = `
        <h2>${location.name}, ${location.region}</h2><div class="cont">
        <div class="p1"><p><strong>Temperature:</strong> ${current.temp_c} °C / ${current.temp_f} °F</p>
        <p><strong>Feels Like:</strong> ${current.feelslike_c} °C / ${current.feelslike_f} °F</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${current.wind_kph} kph / ${current.wind_mph} mph (${current.wind_dir} - ${current.wind_degree}°)</p>
        <p><strong>Wind Gust:</strong> ${current.gust_kph} kph / ${current.gust_mph} mph</p>
        <p><strong>Pressure:</strong> ${current.pressure_mb} mb / ${current.pressure_in} in</p></div>
        <div class="p2">
        <p><strong>Precipitation:</strong> ${current.precip_mm} mm / ${current.precip_in} in</p>
        <p><strong>Visibility:</strong> ${current.vis_km} km / ${current.vis_miles} miles</p>
        <p><strong>Dew Point:</strong> ${current.dewpoint_c} °C / ${current.dewpoint_f} °F</p>
        <p><strong>Heat Index:</strong> ${current.heatindex_c} °C / ${current.heatindex_f} °F</p>
        <p><strong>Wind Chill:</strong> ${current.windchill_c} °C / ${current.windchill_f} °F</p>
        <p><strong>UV Index:</strong> ${current.uv}</p></div></div>
        <p><strong>Last Updated:</strong> ${current.last_updated}</p>
        <img src="${current.condition.icon}" alt="${current.condition.text}">
        <p><strong>Condition:</strong> ${current.condition.text}</p>
    `;
    let dip=document.getElementById('weatherDisplay');
    dip.style.display="block";
    dip.innerHTML = weatherDisplay;
}
