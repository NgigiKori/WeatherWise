window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".locationtimezone")
    let temperatureSection = document.querySelector(".temperature")
    const temperatureSpan = document.querySelector(".temperature span")

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const apiKey = 'c6ff893ad8f2aac6ac109317a9c794c7'
            lat = position.coords.latitude
            long = position.coords.longitude

            const proxy = 'https://cors-anywhere.herokuapp.com/'             
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
            
            //try adding ${proxy} before the string above in case of error

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const {temp} = data.main
                const {description, icon} = data.weather[0]
                const {country} = data.sys
                temperatureDegree.textContent = temp
                temperatureDescription.textContent = description
                locationTimezone.textContent = country

                let celsius = (temp - 32) * (5/9)

                setIcons(icon, document.querySelector(".icon"))

                temperatureSection.addEventListener("click", () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C"
                        temperatureDegree.textContent = celsius
                    } else {
                        temperatureSpan.textContent = "F"
                        temperatureDegree.textContent = temp
                    }
                })
            })
        })
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"})
        const currentIcon = icon
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }

})