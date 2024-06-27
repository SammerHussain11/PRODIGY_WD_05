document.getElementById("getWeather").addEventListener("click", function () {
  const city = document.getElementById("city").value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

async function getWeather(city) {
  const apiKey = "aca5e809169183fbb15438d96aa0cb1c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("An error occurred while fetching the weather data");
  }
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weatherResult");
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherResult.innerHTML = `
    <div class="text-center">
      <h4>${data.name}, ${data.sys.country}</h4>
      <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
      <h5>${data.weather[0].main}</h5>
      <p>${data.weather[0].description}</p>
      <h2>${data.main.temp} &deg;C</h2>
    </div>
  `;
  weatherResult.style.display = "block";
}
