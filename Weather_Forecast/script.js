let weather = {
    apiKey: "4c1e4b7bd211df37f84ee03eb383bf8e", //property 1
    APIEndpoint: "https://api.openweathermap.org/data/2.5",
  
    // ! Function 1
    // get the lat & lot
    async getLatLon(city) {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=${this.apiKey}`
      );
      const coordinatesData = await response.json();
      const latitude = coordinatesData[0].lat;
      const longitude = coordinatesData[0].lon;
      return { latitude, longitude };
    },
  
    // ! Function 2
    // currect day Weather data
    async fetchWeather(city) {
      try {
        // Get lat& log from city name
        const { latitude, longitude } = await this.getLatLon(city);
        const url = `${this.APIEndpoint}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`;
        //Now get the response/data from these lat&log
        const response = await fetch(url); //property 2
        const fetchWeatherdata = await response.json();
  
        //Calling fetch weather function using these data.
        this.displayWeather(fetchWeatherdata);
      } catch (error) {
        document.querySelector(".searchInput").style.border =
          "1px solid rgba(255, 0, 0, 0.4)";
        const myInput = document.querySelector(".searchInput");
        myInput.value = "";
  
        myInput.setAttribute(
          "placeholder",
          "Invalid input. This city does not exist."
        );
      }
    },
  
    // ! Function 3
    //Display current info. calling function to display all these info
    displayWeather: function (data) {
      //Method
      const {
        //We have an object (data) and some variables(name,wearther etc)
        name,
        weather: [{ main, description }], //data.weather[0]
        main: { temp, humidity, pressure, feels_like },
        wind: { speed, deg },
        timezone
      } = data;
  
      // console.log(main);
      // Calculate wind direction
      const windDirections = [
        "North",
        "North East",
        "East",
        "South East",
        "South",
        "South West",
        "West",
        "North West"
      ];
  
      const searchBar = document.querySelector(".searchInput");
      searchBar.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      searchBar.setAttribute("placeholder", "Search...");
  
      const windDirection = windDirections[Math.round((deg % 360) / 45)];
      document.querySelector(
        ".city"
      ).innerHTML = `Weather in <style="text-transform: capitalize";>${searchBar.value}`; //We don't care specifically about the area where we got the data, but the general area so we display this name px florida..we dont care if data is from orlado.
      document.querySelector(
        ".humidity"
      ).innerHTML = `<span>Humidity:</span> ${humidity} %`;
      document.querySelector(".description").innerHTML = `${description}`;
      document.querySelector(
        ".direction"
      ).innerHTML = `<span>Direction:</span> ${windDirection}`;
      document.querySelector(
        ".pressure"
      ).innerHTML = `<span>Atmospheric Pressure:</span> ${pressure}hPa`;
      document.querySelector(
        ".feels_like"
      ).innerHTML = `<span>Feels Like:</span> ${feels_like} &degC`;
      document.querySelector(
        ".speed"
      ).innerHTML = `<span>Speed:</span> ${speed} m/s`;
      document.querySelector(
        ".temp"
      ).innerHTML = `<span>Temperature:</span> ${temp} &degC`;
  
      const weatherImage = document.querySelector(".weatherImage");
      if (main === "Rain") {
        weatherImage.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 9.476 24.843 c -0.034 -0.513 -0.058 -1.029 -0.058 -1.55 c 0 -12.714 10.307 -23.021 23.021 -23.021 c 9.198 0 17.133 5.396 20.82 13.193 c 2.777 -1.972 6.162 -3.142 9.827 -3.142 c 8.48 0 15.49 6.212 16.778 14.329 C 85.703 26.249 90 31.578 90 37.924 c 0 7.607 -6.167 13.774 -13.774 13.774 H 13.774 C 6.167 51.697 0 45.531 0 37.924 C 0 31.819 3.976 26.65 9.476 24.843 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(98,195,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 65.455 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.457 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 66.477 70.862 66.02 71.319 65.455 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 65.455 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.457 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 66.477 89.271 66.02 89.728 65.455 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 55.227 81.547 c -0.565 0 -1.023 -0.457 -1.023 -1.023 v -9.546 c 0 -0.565 0.457 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 56.25 81.089 55.793 81.547 55.227 81.547 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 46.023 70.862 45.565 71.319 45 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 46.023 89.271 45.565 89.728 45 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 34.773 81.547 c -0.565 0 -1.023 -0.457 -1.023 -1.023 v -9.546 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 35.795 81.089 35.338 81.547 34.773 81.547 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 24.545 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.458 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 25.568 70.862 25.11 71.319 24.545 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 24.545 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.458 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 25.568 89.271 25.11 89.728 24.545 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
        </svg>`;
      }
  
      // console.log("Main:",main);
  
      if (main === "Clouds") {
        weatherImage.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="80" height="80" viewBox="0 0 256 256" xml:space="preserve"><defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 9.476 43.858 c -0.034 -0.513 -0.058 -1.029 -0.058 -1.55 c 0 -12.714 10.307 -23.021 23.021 -23.021 c 9.198 0 17.133 5.396 20.82 13.193 c 2.777 -1.972 6.162 -3.142 9.827 -3.142 c 8.48 0 15.49 6.212 16.778 14.329 C 85.703 45.264 90 50.593 90 56.939 c 0 7.607 -6.167 13.774 -13.774 13.774 H 13.774 C 6.167 70.713 0 64.546 0 56.939 C 0 50.834 3.976 45.665 9.476 43.858 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(98,195,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g></svg>`;
      }
  
      if (main === "Snow") {
        weatherImage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 88 43 h -6.823 l 3.13 -3.309 c 0.759 -0.802 0.724 -2.068 -0.079 -2.828 c -0.802 -0.758 -2.066 -0.723 -2.827 0.079 L 75.671 43 h -5.881 l 5.05 -5.339 c 0.759 -0.803 0.724 -2.068 -0.079 -2.828 c -0.803 -0.759 -2.067 -0.723 -2.827 0.079 L 64.283 43 h -5.912 l -4.953 -8.578 l 2.957 -5.122 l 10.829 -2.581 c 1.074 -0.256 1.737 -1.334 1.481 -2.409 c -0.256 -1.075 -1.337 -1.734 -2.409 -1.481 l -7.148 1.704 l 2.941 -5.094 l 8.111 -1.934 c 1.074 -0.256 1.737 -1.334 1.481 -2.409 s -1.334 -1.736 -2.409 -1.481 l -4.43 1.056 l 3.411 -5.909 c 0.552 -0.957 0.225 -2.18 -0.732 -2.732 c -0.959 -0.555 -2.181 -0.225 -2.732 0.732 l -3.411 5.908 l -1.301 -4.364 c -0.315 -1.059 -1.434 -1.664 -2.488 -1.345 c -1.059 0.315 -1.661 1.429 -1.346 2.488 l 2.382 7.991 l -3.108 5.383 l -2.237 -7.508 c -0.315 -1.059 -1.432 -1.663 -2.488 -1.345 c -1.059 0.315 -1.661 1.429 -1.346 2.488 l 3.318 11.135 l -2.789 4.831 h -9.907 l -2.79 -4.832 l 3.318 -11.134 c 0.315 -1.059 -0.287 -2.172 -1.345 -2.488 c -1.057 -0.317 -2.173 0.287 -2.488 1.345 l -2.237 7.508 l -3.108 -5.383 l 2.381 -7.991 c 0.315 -1.059 -0.287 -2.172 -1.345 -2.488 c -1.06 -0.318 -2.173 0.287 -2.488 1.345 l -1.301 4.365 l -3.412 -5.909 C 24.68 5.804 23.457 5.476 22.5 6.029 c -0.957 0.552 -1.284 1.775 -0.732 2.732 l 3.412 5.909 l -4.431 -1.056 c -1.076 -0.256 -2.153 0.408 -2.409 1.481 c -0.256 1.075 0.407 2.153 1.481 2.409 l 8.111 1.934 l 2.941 5.094 l -7.15 -1.704 c -1.079 -0.257 -2.153 0.408 -2.409 1.481 c -0.256 1.075 0.407 2.153 1.481 2.409 l 10.83 2.582 l 2.956 5.12 L 31.629 43 h -5.579 l -7.984 -8.44 c -0.759 -0.801 -2.024 -0.837 -2.828 -0.079 c -0.802 0.759 -0.837 2.025 -0.079 2.828 L 20.544 43 h -6.215 l -5.73 -6.058 c -0.758 -0.801 -2.024 -0.837 -2.828 -0.079 c -0.802 0.759 -0.837 2.025 -0.079 2.828 L 8.823 43 H 2 c -1.104 0 -2 0.896 -2 2 s 0.896 2 2 2 h 6.823 l -3.13 3.31 c -0.759 0.802 -0.724 2.068 0.079 2.827 c 0.387 0.365 0.881 0.547 1.374 0.547 c 0.531 0 1.06 -0.21 1.454 -0.626 L 14.329 47 h 5.882 l -5.05 5.34 c -0.759 0.802 -0.724 2.068 0.079 2.827 c 0.387 0.365 0.881 0.547 1.374 0.547 c 0.531 0 1.06 -0.21 1.454 -0.626 L 25.717 47 h 5.912 l 4.953 8.579 l -2.956 5.12 l -10.83 2.582 c -1.074 0.256 -1.738 1.335 -1.481 2.409 c 0.219 0.919 1.039 1.536 1.944 1.536 c 0.153 0 0.31 -0.018 0.465 -0.055 l 7.15 -1.705 l -2.941 5.095 l -8.111 1.933 c -1.074 0.256 -1.738 1.335 -1.481 2.409 c 0.219 0.919 1.039 1.536 1.944 1.536 c 0.153 0 0.31 -0.018 0.465 -0.055 l 4.431 -1.056 l -3.412 5.91 c -0.552 0.957 -0.225 2.18 0.732 2.732 c 0.315 0.182 0.659 0.268 0.998 0.268 c 0.691 0 1.364 -0.358 1.734 -1 l 3.412 -5.909 l 1.301 4.365 c 0.258 0.868 1.054 1.43 1.916 1.43 c 0.189 0 0.382 -0.027 0.572 -0.084 c 1.059 -0.315 1.661 -1.43 1.345 -2.488 l -2.381 -7.991 l 3.108 -5.383 l 2.237 7.509 c 0.258 0.868 1.054 1.43 1.916 1.43 c 0.189 0 0.382 -0.027 0.572 -0.084 c 1.059 -0.315 1.661 -1.43 1.345 -2.488 l -3.318 -11.134 l 2.79 -4.832 h 9.907 l 2.789 4.831 l -3.318 11.135 c -0.315 1.059 0.287 2.173 1.346 2.488 c 0.19 0.057 0.383 0.084 0.572 0.084 c 0.861 0 1.657 -0.562 1.916 -1.43 l 2.237 -7.508 l 3.108 5.383 l -2.382 7.991 c -0.315 1.059 0.287 2.173 1.346 2.488 c 0.19 0.057 0.383 0.084 0.572 0.084 c 0.861 0 1.657 -0.562 1.916 -1.43 l 1.301 -4.364 l 3.411 5.908 c 0.371 0.642 1.043 1 1.734 1 c 0.339 0 0.683 -0.086 0.998 -0.268 c 0.957 -0.553 1.284 -1.775 0.732 -2.732 l -3.412 -5.909 l 4.43 1.056 c 0.156 0.037 0.312 0.055 0.466 0.055 c 0.904 0 1.725 -0.618 1.943 -1.536 c 0.256 -1.074 -0.407 -2.153 -1.481 -2.409 l -8.111 -1.933 l -2.941 -5.094 l 7.148 1.704 c 0.156 0.037 0.312 0.055 0.466 0.055 c 0.904 0 1.725 -0.617 1.943 -1.536 c 0.256 -1.074 -0.407 -2.153 -1.481 -2.409 L 56.374 60.7 l -2.957 -5.121 L 58.371 47 h 5.579 l 7.984 8.44 c 0.394 0.416 0.923 0.626 1.453 0.626 c 0.493 0 0.987 -0.182 1.374 -0.547 c 0.803 -0.759 0.838 -2.025 0.079 -2.827 L 69.456 47 h 6.216 l 5.73 6.058 c 0.394 0.416 0.923 0.626 1.453 0.626 c 0.493 0 0.988 -0.182 1.374 -0.547 c 0.803 -0.759 0.838 -2.025 0.079 -2.827 L 81.177 47 H 88 c 1.104 0 2 -0.896 2 -2 S 89.104 43 88 43 z M 49.954 53.579 h -9.907 L 35.094 45 l 4.953 -8.579 h 9.907 L 54.906 45 L 49.954 53.579 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(40,203,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
        </svg>`;
      }
  
      if (main === "Thunderstorm") {
        weatherImage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 9.476 25.343 c -0.034 -0.513 -0.058 -1.029 -0.058 -1.55 c 0 -12.714 10.307 -23.021 23.021 -23.021 c 9.198 0 17.133 5.396 20.82 13.193 c 2.777 -1.972 6.162 -3.142 9.827 -3.142 c 8.48 0 15.49 6.212 16.778 14.329 C 85.703 26.749 90 32.078 90 38.424 c 0 7.607 -6.167 13.774 -13.774 13.774 H 13.774 C 6.167 52.197 0 46.031 0 38.424 C 0 32.319 3.976 27.15 9.476 25.343 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(98,195,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 10.733 71.819 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.533 0.763 -0.819 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 11.554 71.554 11.157 71.819 10.733 71.819 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 4.385 90.228 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.534 0.763 -0.819 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 5.206 89.963 4.81 90.228 4.385 90.228 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 17.433 82.047 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.534 0.761 -0.82 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 L 18.4 81.357 C 18.254 81.781 17.858 82.047 17.433 82.047 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 24.84 90.228 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.534 0.763 -0.819 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 25.661 89.963 25.264 90.228 24.84 90.228 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 37.888 82.047 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.534 0.761 -0.82 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 38.709 81.781 38.312 82.047 37.888 82.047 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 51.642 71.819 c -0.111 0 -0.223 -0.018 -0.334 -0.056 c -0.533 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.184 -0.534 0.764 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 52.463 71.554 52.066 71.819 51.642 71.819 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45.294 90.228 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.184 -0.534 0.765 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 46.115 89.963 45.719 90.228 45.294 90.228 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 58.342 82.047 c -0.111 0 -0.223 -0.018 -0.334 -0.056 c -0.533 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.292 -9.546 c 0.184 -0.533 0.764 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.292 9.546 C 59.163 81.781 58.767 82.047 58.342 82.047 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 72.096 71.819 c -0.111 0 -0.223 -0.018 -0.334 -0.056 c -0.533 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.184 -0.534 0.766 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 72.917 71.554 72.521 71.819 72.096 71.819 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 65.749 90.228 c -0.111 0 -0.223 -0.018 -0.334 -0.056 c -0.533 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.184 -0.534 0.766 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 66.57 89.963 66.174 90.228 65.749 90.228 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <polyline points="37.38,31.62 32.02,46.47 39.43,46.47 31.68,68.59 58.32,39.98 49.07,40.19 54.6,31.62 37.38,31.62 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        </g>
        </svg>`;
      }
  
      if (main === "Drizzle" || main === "Rain") {
        weatherImage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="80" height="50" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 9.476 24.843 c -0.034 -0.513 -0.058 -1.029 -0.058 -1.55 c 0 -12.714 10.307 -23.021 23.021 -23.021 c 9.198 0 17.133 5.396 20.82 13.193 c 2.777 -1.972 6.162 -3.142 9.827 -3.142 c 8.48 0 15.49 6.212 16.778 14.329 C 85.703 26.249 90 31.578 90 37.924 c 0 7.607 -6.167 13.774 -13.774 13.774 H 13.774 C 6.167 51.697 0 45.531 0 37.924 C 0 31.819 3.976 26.65 9.476 24.843 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(98,195,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 65.455 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.457 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 66.477 70.862 66.02 71.319 65.455 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 65.455 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.457 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 66.477 89.271 66.02 89.728 65.455 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 55.227 81.547 c -0.565 0 -1.023 -0.457 -1.023 -1.023 v -9.546 c 0 -0.565 0.457 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 56.25 81.089 55.793 81.547 55.227 81.547 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 46.023 70.862 45.565 71.319 45 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 46.023 89.271 45.565 89.728 45 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 34.773 81.547 c -0.565 0 -1.023 -0.457 -1.023 -1.023 v -9.546 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 35.795 81.089 35.338 81.547 34.773 81.547 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 24.545 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.458 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 25.568 70.862 25.11 71.319 24.545 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 24.545 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.458 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 25.568 89.271 25.11 89.728 24.545 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
        </svg>`;
      }
  
      if (main === "Atmosphere") {
        weatherImage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 88 43 h -6.823 l 3.13 -3.309 c 0.759 -0.802 0.724 -2.068 -0.079 -2.828 c -0.802 -0.758 -2.066 -0.723 -2.827 0.079 L 75.671 43 h -5.881 l 5.05 -5.339 c 0.759 -0.803 0.724 -2.068 -0.079 -2.828 c -0.803 -0.759 -2.067 -0.723 -2.827 0.079 L 64.283 43 h -5.912 l -4.953 -8.578 l 2.957 -5.122 l 10.829 -2.581 c 1.074 -0.256 1.737 -1.334 1.481 -2.409 c -0.256 -1.075 -1.337 -1.734 -2.409 -1.481 l -7.148 1.704 l 2.941 -5.094 l 8.111 -1.934 c 1.074 -0.256 1.737 -1.334 1.481 -2.409 s -1.334 -1.736 -2.409 -1.481 l -4.43 1.056 l 3.411 -5.909 c 0.552 -0.957 0.225 -2.18 -0.732 -2.732 c -0.959 -0.555 -2.181 -0.225 -2.732 0.732 l -3.411 5.908 l -1.301 -4.364 c -0.315 -1.059 -1.434 -1.664 -2.488 -1.345 c -1.059 0.315 -1.661 1.429 -1.346 2.488 l 2.382 7.991 l -3.108 5.383 l -2.237 -7.508 c -0.315 -1.059 -1.432 -1.663 -2.488 -1.345 c -1.059 0.315 -1.661 1.429 -1.346 2.488 l 3.318 11.135 l -2.789 4.831 h -9.907 l -2.79 -4.832 l 3.318 -11.134 c 0.315 -1.059 -0.287 -2.172 -1.345 -2.488 c -1.057 -0.317 -2.173 0.287 -2.488 1.345 l -2.237 7.508 l -3.108 -5.383 l 2.381 -7.991 c 0.315 -1.059 -0.287 -2.172 -1.345 -2.488 c -1.06 -0.318 -2.173 0.287 -2.488 1.345 l -1.301 4.365 l -3.412 -5.909 C 24.68 5.804 23.457 5.476 22.5 6.029 c -0.957 0.552 -1.284 1.775 -0.732 2.732 l 3.412 5.909 l -4.431 -1.056 c -1.076 -0.256 -2.153 0.408 -2.409 1.481 c -0.256 1.075 0.407 2.153 1.481 2.409 l 8.111 1.934 l 2.941 5.094 l -7.15 -1.704 c -1.079 -0.257 -2.153 0.408 -2.409 1.481 c -0.256 1.075 0.407 2.153 1.481 2.409 l 10.83 2.582 l 2.956 5.12 L 31.629 43 h -5.579 l -7.984 -8.44 c -0.759 -0.801 -2.024 -0.837 -2.828 -0.079 c -0.802 0.759 -0.837 2.025 -0.079 2.828 L 20.544 43 h -6.215 l -5.73 -6.058 c -0.758 -0.801 -2.024 -0.837 -2.828 -0.079 c -0.802 0.759 -0.837 2.025 -0.079 2.828 L 8.823 43 H 2 c -1.104 0 -2 0.896 -2 2 s 0.896 2 2 2 h 6.823 l -3.13 3.31 c -0.759 0.802 -0.724 2.068 0.079 2.827 c 0.387 0.365 0.881 0.547 1.374 0.547 c 0.531 0 1.06 -0.21 1.454 -0.626 L 14.329 47 h 5.882 l -5.05 5.34 c -0.759 0.802 -0.724 2.068 0.079 2.827 c 0.387 0.365 0.881 0.547 1.374 0.547 c 0.531 0 1.06 -0.21 1.454 -0.626 L 25.717 47 h 5.912 l 4.953 8.579 l -2.956 5.12 l -10.83 2.582 c -1.074 0.256 -1.738 1.335 -1.481 2.409 c 0.219 0.919 1.039 1.536 1.944 1.536 c 0.153 0 0.31 -0.018 0.465 -0.055 l 7.15 -1.705 l -2.941 5.095 l -8.111 1.933 c -1.074 0.256 -1.738 1.335 -1.481 2.409 c 0.219 0.919 1.039 1.536 1.944 1.536 c 0.153 0 0.31 -0.018 0.465 -0.055 l 4.431 -1.056 l -3.412 5.91 c -0.552 0.957 -0.225 2.18 0.732 2.732 c 0.315 0.182 0.659 0.268 0.998 0.268 c 0.691 0 1.364 -0.358 1.734 -1 l 3.412 -5.909 l 1.301 4.365 c 0.258 0.868 1.054 1.43 1.916 1.43 c 0.189 0 0.382 -0.027 0.572 -0.084 c 1.059 -0.315 1.661 -1.43 1.345 -2.488 l -2.381 -7.991 l 3.108 -5.383 l 2.237 7.509 c 0.258 0.868 1.054 1.43 1.916 1.43 c 0.189 0 0.382 -0.027 0.572 -0.084 c 1.059 -0.315 1.661 -1.43 1.345 -2.488 l -3.318 -11.134 l 2.79 -4.832 h 9.907 l 2.789 4.831 l -3.318 11.135 c -0.315 1.059 0.287 2.173 1.346 2.488 c 0.19 0.057 0.383 0.084 0.572 0.084 c 0.861 0 1.657 -0.562 1.916 -1.43 l 2.237 -7.508 l 3.108 5.383 l -2.382 7.991 c -0.315 1.059 0.287 2.173 1.346 2.488 c 0.19 0.057 0.383 0.084 0.572 0.084 c 0.861 0 1.657 -0.562 1.916 -1.43 l 1.301 -4.364 l 3.411 5.908 c 0.371 0.642 1.043 1 1.734 1 c 0.339 0 0.683 -0.086 0.998 -0.268 c 0.957 -0.553 1.284 -1.775 0.732 -2.732 l -3.412 -5.909 l 4.43 1.056 c 0.156 0.037 0.312 0.055 0.466 0.055 c 0.904 0 1.725 -0.618 1.943 -1.536 c 0.256 -1.074 -0.407 -2.153 -1.481 -2.409 l -8.111 -1.933 l -2.941 -5.094 l 7.148 1.704 c 0.156 0.037 0.312 0.055 0.466 0.055 c 0.904 0 1.725 -0.617 1.943 -1.536 c 0.256 -1.074 -0.407 -2.153 -1.481 -2.409 L 56.374 60.7 l -2.957 -5.121 L 58.371 47 h 5.579 l 7.984 8.44 c 0.394 0.416 0.923 0.626 1.453 0.626 c 0.493 0 0.987 -0.182 1.374 -0.547 c 0.803 -0.759 0.838 -2.025 0.079 -2.827 L 69.456 47 h 6.216 l 5.73 6.058 c 0.394 0.416 0.923 0.626 1.453 0.626 c 0.493 0 0.988 -0.182 1.374 -0.547 c 0.803 -0.759 0.838 -2.025 0.079 -2.827 L 81.177 47 H 88 c 1.104 0 2 -0.896 2 -2 S 89.104 43 88 43 z M 49.954 53.579 h -9.907 L 35.094 45 l 4.953 -8.579 h 9.907 L 54.906 45 L 49.954 53.579 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(40,203,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
        </svg>`;
      }
  
      if (main === "Clear") {
        weatherImage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
  
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <circle cx="44.995999999999995" cy="44.995999999999995" r="26.676" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
          <path d="M 45 11.053 c -0.552 0 -1 -0.448 -1 -1 V 1 c 0 -0.552 0.448 -1 1 -1 s 1 0.448 1 1 v 9.053 C 46 10.605 45.552 11.053 45 11.053 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 90 c -0.552 0 -1 -0.447 -1 -1 v -9.053 c 0 -0.553 0.448 -1 1 -1 s 1 0.447 1 1 V 89 C 46 89.553 45.552 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 10.053 46 H 1 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 9.053 c 0.552 0 1 0.448 1 1 S 10.605 46 10.053 46 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 89 46 h -9.053 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 H 89 c 0.553 0 1 0.448 1 1 S 89.553 46 89 46 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 69.711 21.289 c -0.256 0 -0.512 -0.098 -0.707 -0.293 c -0.391 -0.391 -0.391 -1.023 0 -1.414 l 6.401 -6.401 c 0.391 -0.391 1.023 -0.391 1.414 0 s 0.391 1.023 0 1.414 l -6.401 6.401 C 70.223 21.191 69.967 21.289 69.711 21.289 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 13.887 77.112 c -0.256 0 -0.512 -0.098 -0.707 -0.293 c -0.391 -0.391 -0.391 -1.023 0 -1.414 l 6.401 -6.401 c 0.391 -0.391 1.023 -0.391 1.414 0 s 0.391 1.023 0 1.414 l -6.401 6.401 C 14.399 77.015 14.143 77.112 13.887 77.112 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 20.289 21.289 c -0.256 0 -0.512 -0.098 -0.707 -0.293 l -6.401 -6.401 c -0.391 -0.391 -0.391 -1.023 0 -1.414 s 1.023 -0.391 1.414 0 l 6.401 6.401 c 0.391 0.391 0.391 1.023 0 1.414 C 20.8 21.191 20.544 21.289 20.289 21.289 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 76.112 77.112 c -0.256 0 -0.512 -0.098 -0.707 -0.293 l -6.401 -6.401 c -0.391 -0.391 -0.391 -1.023 0 -1.414 s 1.023 -0.391 1.414 0 l 6.401 6.401 c 0.391 0.391 0.391 1.023 0 1.414 C 76.624 77.015 76.368 77.112 76.112 77.112 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
        </svg>`;
      }
    },
  
    // ! Function 4
    // full week forecast
    // need to call another API.
    // i will get fetch API
    fetchData: async function (city) {
      try {
        const { latitude, longitude } = await this.getLatLon(city);
        const url = `${this.APIEndpoint}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=f883dd5b91b4be57660b80bc1041ced6`;
        const response = await fetch(url);
        const data = await response.json();
        const dailyForecasts = {}; //object keeps min & max
  
        data.list.forEach((forecast) => {
          //for each element/forecast
          const {
            dt_txt,
            main: { temp_min, temp_max },
            weather
          } = forecast; //dt_txt,main,weather are properties. main has two more properties inside
  
          const date = dt_txt.split(" ")[0]; //"dt_txt": "2022-08-30 17:00:00" - i get [0] only date...i dont need timestamp
  
          /* If you remove the if statement, the code will overwrite any existing values for dailyForecasts[date] instead of adding to them.So if exists then find max and then overwrite.Else create the object. */
          if (!dailyForecasts[date]) {
            // checks if object with this date DOES NOT exists.
  
            dailyForecasts[date] = {
              minTemp: forecast.main.temp_min, //assign min
              maxTemp: forecast.main.temp_max, //assign max
              Temp: forecast.main.temp //assign max
            };
          } else {
            dailyForecasts[date].minTemp = Math.min(
              dailyForecasts[date].minTemp,
              forecast.main.temp_min
            );
            dailyForecasts[date].maxTemp = Math.max(
              dailyForecasts[date].maxTemp,
              forecast.main.temp_max
            );
          }
          dailyForecasts[date].icon = forecast.weather[0].icon;
        });
  
        // remove old data
        const weeklyForecast = document.querySelector(".weeklyForecast");
        weeklyForecast.innerHTML = "";
  
        // add the new data -- create DayCard
        for (const date in dailyForecasts) {
          const dateObj = new Date(date);
          const dayOfWeek = dateObj.toLocaleDateString("en-US", {
            weekday: "long"
          });
  
          const { maxTemp, icon, temp } = dailyForecasts[date];
  
          const dayCard = createDayCard(dayOfWeek, maxTemp, icon);
  
          weeklyForecast.appendChild(dayCard);
        }
      } catch (error) {
        console.log("Problem found-Error:", error);
      }
    }
  };
  
  // !Create DayCard
  function createDayCard(dayOfWeek, maxTemp, icon) {
    const dayCard = document.createElement("div");
    dayCard.classList.add("dayCard");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
  
    h3.textContent = `${dayOfWeek}:`;
    p.innerHTML = `Max Temp:${maxTemp}&degC`;
  
    const img = document.createElement("img");
  
    const Icon = icon.slice(0, -1);
    // console.log(Icon);
    dayCard.appendChild(h3);
    if (Icon === "01") {
      //its clear sky.
      dayCard.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
  
      <defs>
      </defs>
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <circle cx="44.995999999999995" cy="44.995999999999995" r="26.676" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        <path d="M 45 11.053 c -0.552 0 -1 -0.448 -1 -1 V 1 c 0 -0.552 0.448 -1 1 -1 s 1 0.448 1 1 v 9.053 C 46 10.605 45.552 11.053 45 11.053 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 45 90 c -0.552 0 -1 -0.447 -1 -1 v -9.053 c 0 -0.553 0.448 -1 1 -1 s 1 0.447 1 1 V 89 C 46 89.553 45.552 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 10.053 46 H 1 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 9.053 c 0.552 0 1 0.448 1 1 S 10.605 46 10.053 46 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 89 46 h -9.053 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 H 89 c 0.553 0 1 0.448 1 1 S 89.553 46 89 46 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 69.711 21.289 c -0.256 0 -0.512 -0.098 -0.707 -0.293 c -0.391 -0.391 -0.391 -1.023 0 -1.414 l 6.401 -6.401 c 0.391 -0.391 1.023 -0.391 1.414 0 s 0.391 1.023 0 1.414 l -6.401 6.401 C 70.223 21.191 69.967 21.289 69.711 21.289 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 13.887 77.112 c -0.256 0 -0.512 -0.098 -0.707 -0.293 c -0.391 -0.391 -0.391 -1.023 0 -1.414 l 6.401 -6.401 c 0.391 -0.391 1.023 -0.391 1.414 0 s 0.391 1.023 0 1.414 l -6.401 6.401 C 14.399 77.015 14.143 77.112 13.887 77.112 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 20.289 21.289 c -0.256 0 -0.512 -0.098 -0.707 -0.293 l -6.401 -6.401 c -0.391 -0.391 -0.391 -1.023 0 -1.414 s 1.023 -0.391 1.414 0 l 6.401 6.401 c 0.391 0.391 0.391 1.023 0 1.414 C 20.8 21.191 20.544 21.289 20.289 21.289 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 76.112 77.112 c -0.256 0 -0.512 -0.098 -0.707 -0.293 l -6.401 -6.401 c -0.391 -0.391 -0.391 -1.023 0 -1.414 s 1.023 -0.391 1.414 0 l 6.401 6.401 c 0.391 0.391 0.391 1.023 0 1.414 C 76.624 77.015 76.368 77.112 76.112 77.112 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
      </g>
      </svg>`;
    }
  
    if (Icon === "02" || Icon === "03" || Icon === "04") {
      // console.log("cloudy!");
      dayCard.innerHTML += ` <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve"><defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 9.476 43.858 c -0.034 -0.513 -0.058 -1.029 -0.058 -1.55 c 0 -12.714 10.307 -23.021 23.021 -23.021 c 9.198 0 17.133 5.396 20.82 13.193 c 2.777 -1.972 6.162 -3.142 9.827 -3.142 c 8.48 0 15.49 6.212 16.778 14.329 C 85.703 45.264 90 50.593 90 56.939 c 0 7.607 -6.167 13.774 -13.774 13.774 H 13.774 C 6.167 70.713 0 64.546 0 56.939 C 0 50.834 3.976 45.665 9.476 43.858 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(98,195,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g></svg>`;
    }
  
    if (Icon === "09" || Icon === "10") {
      dayCard.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 9.476 24.843 c -0.034 -0.513 -0.058 -1.029 -0.058 -1.55 c 0 -12.714 10.307 -23.021 23.021 -23.021 c 9.198 0 17.133 5.396 20.82 13.193 c 2.777 -1.972 6.162 -3.142 9.827 -3.142 c 8.48 0 15.49 6.212 16.778 14.329 C 85.703 26.249 90 31.578 90 37.924 c 0 7.607 -6.167 13.774 -13.774 13.774 H 13.774 C 6.167 51.697 0 45.531 0 37.924 C 0 31.819 3.976 26.65 9.476 24.843 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(98,195,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 65.455 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.457 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 66.477 70.862 66.02 71.319 65.455 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 65.455 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.457 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 66.477 89.271 66.02 89.728 65.455 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 55.227 81.547 c -0.565 0 -1.023 -0.457 -1.023 -1.023 v -9.546 c 0 -0.565 0.457 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 56.25 81.089 55.793 81.547 55.227 81.547 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 46.023 70.862 45.565 71.319 45 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 46.023 89.271 45.565 89.728 45 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 34.773 81.547 c -0.565 0 -1.023 -0.457 -1.023 -1.023 v -9.546 c 0 -0.565 0.458 -1.023 1.023 -1.023 s 1.023 0.457 1.023 1.023 v 9.546 C 35.795 81.089 35.338 81.547 34.773 81.547 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 24.545 71.319 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 60.75 c 0 -0.565 0.458 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 25.568 70.862 25.11 71.319 24.545 71.319 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 24.545 89.728 c -0.565 0 -1.023 -0.457 -1.023 -1.023 V 79.16 c 0 -0.565 0.458 -1.023 1.023 -1.023 c 0.565 0 1.023 0.457 1.023 1.023 v 9.546 C 25.568 89.271 25.11 89.728 24.545 89.728 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
        </svg>`;
    }
  
    if (Icon === "11") {
      dayCard.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
      <defs>
      </defs>
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <path d="M 9.476 25.343 c -0.034 -0.513 -0.058 -1.029 -0.058 -1.55 c 0 -12.714 10.307 -23.021 23.021 -23.021 c 9.198 0 17.133 5.396 20.82 13.193 c 2.777 -1.972 6.162 -3.142 9.827 -3.142 c 8.48 0 15.49 6.212 16.778 14.329 C 85.703 26.749 90 32.078 90 38.424 c 0 7.607 -6.167 13.774 -13.774 13.774 H 13.774 C 6.167 52.197 0 46.031 0 38.424 C 0 32.319 3.976 27.15 9.476 25.343 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(98,195,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 10.733 71.819 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.533 0.763 -0.819 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 11.554 71.554 11.157 71.819 10.733 71.819 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 4.385 90.228 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.534 0.763 -0.819 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 5.206 89.963 4.81 90.228 4.385 90.228 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 17.433 82.047 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.534 0.761 -0.82 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 L 18.4 81.357 C 18.254 81.781 17.858 82.047 17.433 82.047 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 24.84 90.228 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.534 0.763 -0.819 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 25.661 89.963 25.264 90.228 24.84 90.228 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 37.888 82.047 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.183 -0.534 0.761 -0.82 1.3 -0.633 c 0.534 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 38.709 81.781 38.312 82.047 37.888 82.047 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 51.642 71.819 c -0.111 0 -0.223 -0.018 -0.334 -0.056 c -0.533 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.184 -0.534 0.764 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 52.463 71.554 52.066 71.819 51.642 71.819 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 45.294 90.228 c -0.11 0 -0.223 -0.018 -0.334 -0.056 c -0.534 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.184 -0.534 0.765 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 46.115 89.963 45.719 90.228 45.294 90.228 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 58.342 82.047 c -0.111 0 -0.223 -0.018 -0.334 -0.056 c -0.533 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.292 -9.546 c 0.184 -0.533 0.764 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.292 9.546 C 59.163 81.781 58.767 82.047 58.342 82.047 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 72.096 71.819 c -0.111 0 -0.223 -0.018 -0.334 -0.056 c -0.533 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.184 -0.534 0.766 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 72.917 71.554 72.521 71.819 72.096 71.819 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <path d="M 65.749 90.228 c -0.111 0 -0.223 -0.018 -0.334 -0.056 c -0.533 -0.184 -0.817 -0.766 -0.633 -1.3 l 3.291 -9.546 c 0.184 -0.534 0.766 -0.816 1.3 -0.633 c 0.533 0.184 0.817 0.766 0.633 1.3 l -3.291 9.546 C 66.57 89.963 66.174 90.228 65.749 90.228 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(123,216,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        <polyline points="37.38,31.62 32.02,46.47 39.43,46.47 31.68,68.59 58.32,39.98 49.07,40.19 54.6,31.62 37.38,31.62 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(249,193,0); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
      </g>
      </svg>`;
    }
  
    if (Icon === "13") {
      dayCard.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
  
      <defs>
      </defs>
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <path d="M 88 43 h -6.823 l 3.13 -3.309 c 0.759 -0.802 0.724 -2.068 -0.079 -2.828 c -0.802 -0.758 -2.066 -0.723 -2.827 0.079 L 75.671 43 h -5.881 l 5.05 -5.339 c 0.759 -0.803 0.724 -2.068 -0.079 -2.828 c -0.803 -0.759 -2.067 -0.723 -2.827 0.079 L 64.283 43 h -5.912 l -4.953 -8.578 l 2.957 -5.122 l 10.829 -2.581 c 1.074 -0.256 1.737 -1.334 1.481 -2.409 c -0.256 -1.075 -1.337 -1.734 -2.409 -1.481 l -7.148 1.704 l 2.941 -5.094 l 8.111 -1.934 c 1.074 -0.256 1.737 -1.334 1.481 -2.409 s -1.334 -1.736 -2.409 -1.481 l -4.43 1.056 l 3.411 -5.909 c 0.552 -0.957 0.225 -2.18 -0.732 -2.732 c -0.959 -0.555 -2.181 -0.225 -2.732 0.732 l -3.411 5.908 l -1.301 -4.364 c -0.315 -1.059 -1.434 -1.664 -2.488 -1.345 c -1.059 0.315 -1.661 1.429 -1.346 2.488 l 2.382 7.991 l -3.108 5.383 l -2.237 -7.508 c -0.315 -1.059 -1.432 -1.663 -2.488 -1.345 c -1.059 0.315 -1.661 1.429 -1.346 2.488 l 3.318 11.135 l -2.789 4.831 h -9.907 l -2.79 -4.832 l 3.318 -11.134 c 0.315 -1.059 -0.287 -2.172 -1.345 -2.488 c -1.057 -0.317 -2.173 0.287 -2.488 1.345 l -2.237 7.508 l -3.108 -5.383 l 2.381 -7.991 c 0.315 -1.059 -0.287 -2.172 -1.345 -2.488 c -1.06 -0.318 -2.173 0.287 -2.488 1.345 l -1.301 4.365 l -3.412 -5.909 C 24.68 5.804 23.457 5.476 22.5 6.029 c -0.957 0.552 -1.284 1.775 -0.732 2.732 l 3.412 5.909 l -4.431 -1.056 c -1.076 -0.256 -2.153 0.408 -2.409 1.481 c -0.256 1.075 0.407 2.153 1.481 2.409 l 8.111 1.934 l 2.941 5.094 l -7.15 -1.704 c -1.079 -0.257 -2.153 0.408 -2.409 1.481 c -0.256 1.075 0.407 2.153 1.481 2.409 l 10.83 2.582 l 2.956 5.12 L 31.629 43 h -5.579 l -7.984 -8.44 c -0.759 -0.801 -2.024 -0.837 -2.828 -0.079 c -0.802 0.759 -0.837 2.025 -0.079 2.828 L 20.544 43 h -6.215 l -5.73 -6.058 c -0.758 -0.801 -2.024 -0.837 -2.828 -0.079 c -0.802 0.759 -0.837 2.025 -0.079 2.828 L 8.823 43 H 2 c -1.104 0 -2 0.896 -2 2 s 0.896 2 2 2 h 6.823 l -3.13 3.31 c -0.759 0.802 -0.724 2.068 0.079 2.827 c 0.387 0.365 0.881 0.547 1.374 0.547 c 0.531 0 1.06 -0.21 1.454 -0.626 L 14.329 47 h 5.882 l -5.05 5.34 c -0.759 0.802 -0.724 2.068 0.079 2.827 c 0.387 0.365 0.881 0.547 1.374 0.547 c 0.531 0 1.06 -0.21 1.454 -0.626 L 25.717 47 h 5.912 l 4.953 8.579 l -2.956 5.12 l -10.83 2.582 c -1.074 0.256 -1.738 1.335 -1.481 2.409 c 0.219 0.919 1.039 1.536 1.944 1.536 c 0.153 0 0.31 -0.018 0.465 -0.055 l 7.15 -1.705 l -2.941 5.095 l -8.111 1.933 c -1.074 0.256 -1.738 1.335 -1.481 2.409 c 0.219 0.919 1.039 1.536 1.944 1.536 c 0.153 0 0.31 -0.018 0.465 -0.055 l 4.431 -1.056 l -3.412 5.91 c -0.552 0.957 -0.225 2.18 0.732 2.732 c 0.315 0.182 0.659 0.268 0.998 0.268 c 0.691 0 1.364 -0.358 1.734 -1 l 3.412 -5.909 l 1.301 4.365 c 0.258 0.868 1.054 1.43 1.916 1.43 c 0.189 0 0.382 -0.027 0.572 -0.084 c 1.059 -0.315 1.661 -1.43 1.345 -2.488 l -2.381 -7.991 l 3.108 -5.383 l 2.237 7.509 c 0.258 0.868 1.054 1.43 1.916 1.43 c 0.189 0 0.382 -0.027 0.572 -0.084 c 1.059 -0.315 1.661 -1.43 1.345 -2.488 l -3.318 -11.134 l 2.79 -4.832 h 9.907 l 2.789 4.831 l -3.318 11.135 c -0.315 1.059 0.287 2.173 1.346 2.488 c 0.19 0.057 0.383 0.084 0.572 0.084 c 0.861 0 1.657 -0.562 1.916 -1.43 l 2.237 -7.508 l 3.108 5.383 l -2.382 7.991 c -0.315 1.059 0.287 2.173 1.346 2.488 c 0.19 0.057 0.383 0.084 0.572 0.084 c 0.861 0 1.657 -0.562 1.916 -1.43 l 1.301 -4.364 l 3.411 5.908 c 0.371 0.642 1.043 1 1.734 1 c 0.339 0 0.683 -0.086 0.998 -0.268 c 0.957 -0.553 1.284 -1.775 0.732 -2.732 l -3.412 -5.909 l 4.43 1.056 c 0.156 0.037 0.312 0.055 0.466 0.055 c 0.904 0 1.725 -0.618 1.943 -1.536 c 0.256 -1.074 -0.407 -2.153 -1.481 -2.409 l -8.111 -1.933 l -2.941 -5.094 l 7.148 1.704 c 0.156 0.037 0.312 0.055 0.466 0.055 c 0.904 0 1.725 -0.617 1.943 -1.536 c 0.256 -1.074 -0.407 -2.153 -1.481 -2.409 L 56.374 60.7 l -2.957 -5.121 L 58.371 47 h 5.579 l 7.984 8.44 c 0.394 0.416 0.923 0.626 1.453 0.626 c 0.493 0 0.987 -0.182 1.374 -0.547 c 0.803 -0.759 0.838 -2.025 0.079 -2.827 L 69.456 47 h 6.216 l 5.73 6.058 c 0.394 0.416 0.923 0.626 1.453 0.626 c 0.493 0 0.988 -0.182 1.374 -0.547 c 0.803 -0.759 0.838 -2.025 0.079 -2.827 L 81.177 47 H 88 c 1.104 0 2 -0.896 2 -2 S 89.104 43 88 43 z M 49.954 53.579 h -9.907 L 35.094 45 l 4.953 -8.579 h 9.907 L 54.906 45 L 49.954 53.579 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(40,203,247); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
      </g>
      </svg>`;
    }
  
    dayCard.appendChild(p);
  
    return dayCard;
  }
  
  // !EventListeners.
  document.querySelector(".searchBtn").addEventListener("click", () => {
    weather.fetchWeather(document.querySelector(".searchInput").value);
    weather.fetchData(document.querySelector(".searchInput").value);
  
    document.querySelector(".weatherContainer").classList.add("open");
  
    const image = document.querySelector("#image");
  
    image.classList.add("fade");
  });
  
  document.querySelector(".searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      weather.fetchWeather(document.querySelector(".searchInput").value);
      weather.fetchData(document.querySelector(".searchInput").value);
  
      document.querySelector(".weatherContainer").classList.add("open");
    }
  });
  