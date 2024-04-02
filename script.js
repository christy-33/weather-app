


const apiKey="6b544bb7bd8cd88c0d9e2fd142ab5565";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const API_KEY="f4207b9a5b21f064dd5782d593137d5f53116cb2354eac0be2a905c31ff774c0"
const aqi_URL=" https://api.ambeedata.com/latest/by-city?city="


            const searchBox=document.querySelector(".search input");
            const searchBtn=document.querySelector(".search button");
            const weatherIcon=document.querySelector(".weather-icon");
            const lev=document.querySelector(".level");
            
            function convertUnixTimestamp(unixTimestamp, timezoneOffset) {
                // Convert to milliseconds and adjust for the timezone offset
                console.log("Unix Timestamp:", unixTimestamp);
                console.log("Timezone Offset:", timezoneOffset);



                if (isNaN(unixTimestamp) || isNaN(timezoneOffset)) {
                    return "Invalid input"; // Handle invalid input
                  }
                const date = new Date((unixTimestamp + timezoneOffset-19800) * 1000);
              
                // Get hours, minutes, and seconds
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes();
                const seconds = "0" + date.getSeconds();
              
                // Format the time
                const formattedTime = hours + ':' + minutes.slice(-2);
              
                return formattedTime;
              }

            async function checkWeather(city){
                const response = await fetch(apiUrl + city+`&appid=${apiKey}`);
                
                if(response.status==404){
                    document.querySelector(".error").style.display="block";
                    document.querySelector(".weather").style.display="none";
                    document.querySelector(".card2").style.display="none";
                    document.querySelector(".card3").style.display="none";
                    document.querySelector(".today-forecast").style.display="none";
                }
                else{
                    var data = await response.json();
                    const res = await fetch(aqi_URL + city,{"method":"GET","headers":{
                        "x-api-key":API_KEY,
                        "Content-type":"application/json"
                        }});
                if (res.status==404){
                    document.querySelector(".error").style.display="block";
                    document.querySelector(".weather").style.display="none";
                    document.querySelector(".card2").style.display="none";
                    document.querySelector(".card3").style.display="none";
                    document.querySelector(".today-forecast").style.display="none";

                }
                else{
                    var aqi_data=await res.json();

                    document.querySelector(".city").innerHTML=data.name;
                    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
                    document.querySelector(".range").innerHTML=Math.round(data.main.temp_min) + "°C"+" ~ "+Math.round(data.main.temp_max) + "°C";
                    //document.querySelector(".t_max").innerHTML=Math.round(data.main.temp_max) + "°C";
                    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
                    document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";
                    document.querySelector(".air-pressure").innerHTML=data.main.pressure + " hPa";
                    document.querySelector(".feels-like").innerHTML=Math.round(data.main.feels_like) + "°C";
                    document.querySelector(".visibility").innerHTML=((data.visibility)/1000) + " km";
                    document.querySelector(".aqi").innerHTML= aqi_data.stations[0].AQI ;
                    document.querySelector(".level").innerHTML= aqi_data.stations[0].aqiInfo.category;
                    document.querySelector(".set").innerHTML=convertUnixTimestamp(data.sys.sunset,data.timezone);
                    document.querySelector(".rise").innerHTML=convertUnixTimestamp(data.sys.sunrise,data.timezone);
                    var ln=data.coord.lon;
                    var lt=data.coord.lat;

                    

                    if(data.weather[0].main=="Clouds"){
                        weatherIcon.src="images/clouds.png";
                    }
                    else if(data.weather[0].main=="Clear"){
                        weatherIcon.src="images/clear.png";
                    }
                    else if(data.weather[0].main=="Rain"){
                        weatherIcon.src="images/rain.png";
                    }
                    else if(data.weather[0].main=="Drizzle"){
                        weatherIcon.src="images/drizzle.png";
                    }
                    else if(data.weather[0].main=="Mist"){
                        weatherIcon.src="images/mist.png";
                    }

                    
                    document.querySelector(".weather").style.display="block";
                    document.querySelector(".card2").style.display="block";
                    document.querySelector(".card3").style.display="block";
                    document.querySelector(".today-forecast").style.display="block";
                    document.querySelector(".error").style.display="none";


                }
                }
            console.log(data);
            console.log(aqi_data);
            }
            
            

            searchBtn.addEventListener("click",()=>{checkWeather(searchBox.value);});  //this will call the function named checkWeather when the search button is clicked

            searchBox.addEventListener("keyup",(e)=>{
                if(e.key=="Enter"){
                    checkWeather(searchBox.value);
                }
            });