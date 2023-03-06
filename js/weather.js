(function() {
    debugger;
    let cityName = getLocaleStorage() == null  ? 'Minsk' : getLocaleStorage();
    setLocaleStorage(cityName);
    document.querySelector('.city').value = cityName;
    getWeather(cityName);

    document.querySelector('.city').addEventListener('change', (event) => {
        cityName = document.querySelector('.city').value;
        setLocaleStorage(cityName);
        getWeather(cityName);
    })

    async function getWeather(cityName) {
        
        const weatherIcon = document.querySelector('.weather-icon');
        const temperature = document.querySelector('.temperature');
        const weatherDescription = document.querySelector('.weather-description');

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=0586c2ae56822e3dda36e9eb441e7a4e&units=imperial`;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                weatherDescription.textContent = "City not found";
                temperature.textContent = "";
            }

            const data = await res.json(); 

            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${data.main.temp}°F`;
            weatherDescription.textContent = data.weather[0].description;
        }
        catch (err) {
            weatherDescription.textContent = "City not found";
        }
    }

    function setLocaleStorage(value) {
            
        localStorage.setItem('city', value);
    }

    function getLocaleStorage() {
    
        if (localStorage.getItem('city')) {
            return localStorage.getItem('city');
        }
    }

})();