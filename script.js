document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cardsContainer');

  
  fetch('https://restcountries.com/v3/all') 
    .then(response => response.json())
    .then(data => {
     let row;
     let cardCounter = 0;

      data.forEach(country => {
        if (cardCounter % 3 === 0) {
          row = document.createElement('div');
          row.classList.add('row');
          cardsContainer.appendChild(row);
        }
        createCountryCard(country, row);
        cardCounter++;
      });
    })
    .catch(error => {
      console.log('Rest Countries API Error:', error);
    });
});

function createCountryCard(country) {
  const card = document.createElement('div');
  card.classList.add('card', 'mb-3');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');
  cardHeader.textContent = country.name.common;

  const flagImage = document.createElement('img');
  flagImage.classList.add('card-img-top');
  flagImage.src = country.flags.png;
  flagImage.alt = `${country.name.common} flag`;

  const capital = document.createElement('p');
  capital.classList.add('card-text');
  capital.textContent = `Capital: ${country.capital}`;

  const latlng = document.createElement('p');
  latlng.classList.add('card-text');
  latlng.textContent = `Latlng: [${country.latlng}]`;

  const region = document.createElement('p');
  region.classList.add('card-text');
  region.textContent = `Region: ${country.region}`;

  const countryCodes = document.createElement('p');
  countryCodes.classList.add('card-text');
  countryCodes.textContent = `Country Codes: ${Object.values(country.cca2).join(', ')}`;

  const fetchWeatherButton = document.createElement('button');
  fetchWeatherButton.classList.add('btn', 'btn-primary');
  fetchWeatherButton.textContent = 'Click for Weather';
  fetchWeatherButton.addEventListener('click', () => {
    fetchAndDisplayWeather(country, cardBody);
  });

  cardHeader.appendChild(flagImage);
  cardBody.appendChild(capital);
  cardBody.appendChild(latlng);
  cardBody.appendChild(region);
  cardBody.appendChild(countryCodes);
  cardBody.appendChild(fetchWeatherButton);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  cardsContainer.appendChild(card);
}


function fetchAndDisplayWeather(country, cardBodyContent) {
  const [latitude, longitude] = country.latlng;
  const apiKey = '2ee67f62e8966194d8d75603692fdee7'; 
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(weatherData => {
      const temperature = (weatherData.main.temp - 273.15).toFixed(2); 

      const temperatureDisplay = document.createElement('p');
      temperatureDisplay.textContent = `Temperature: ${temperature}°C`;

      // Append temperature data to the card
      cardBodyContent.appendChild(temperatureDisplay);
    })
    .catch(error => {
      console.log('Weather API Error:', error);
    });
}
