const apiKey = '61eae5bcd2afa69b042a332e4ecceab7';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {

            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
            console.error(`API Error: ${errorData.message}`);
            return;
        }

        const data = await response.json();
        

        if (data.cod === '404') {
            alert('City not found! Please try another city.');
            return;
        }


        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temperature').innerText = data.main.temp;
        document.getElementById('weatherDescription').innerText = data.weather[0].description;
        
        document.getElementById('weatherInfo').style.display = 'block';
    } catch (error) {

        alert('Error fetching weather data. Please try again later.');
        console.error('Fetch Error:', error);
    }
}

