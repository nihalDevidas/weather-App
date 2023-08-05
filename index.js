// rain clear clouds Haze

//note: to get the data, city name should 100% acurate without spelling mistake

const API_KEY = `e0e1536b200af29dbe935aff3c7b7c17`;

const inputFeild = document.getElementById("search-box");
const findButton = document.getElementById("add-btn");
const weatherdataContainer = document.getElementById("weather-Data-container");

let cityArray = [];


const checkCityName = (Name)=>{

     for(let i = 0; i< cityArray.length; i++)
     {
        if(cityArray[i].name === Name){
            return true;
        }

     }
     return false;
}


const sortCityArray = ()=>{
     
    cityArray.sort((x,y)=>{
           
        if(x.main.temp > y.main.temp){
            return 1;
        }
        if(x.main.temp < y.main.temp){
            return -1;
        }
        return 0;
    });

    displayData();
}


function fetchIcons(value){
    let icon = "";

    switch(value){

        case "rain": icon = `<i class="fa-solid fa-cloud-showers-water icons"></i>`;
                      break;

        case "clouds": icon = `<i class="fa-solid fa-cloud icons"></i>`;
                       break; 

        case "clear": icon =  `<i class="fa-solid fa-sun icons"></i>`;
                       break; 

        case "clear": icon =  `<i class="fa-solid fa-smog icons"></i>`;
                       break; 
        default :    icon =  `<i class="fa-solid fa-cloud-sun-rain icons"></i>`;

    }

    return icon;
}




fetchWeatherData = async (cityName)=>{

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try{
        let response = await fetch(url,{method: "GET"});
        const weatherData = await response.json(); 
        console.log(weatherData);
 
        const CityName = weatherData.name.toLowerCase();

        if(checkCityName(CityName)){
            console.log("city already present ");
            return;
        }
        else{
             const obj = {
                name:  weatherData.name.toLowerCase(),
                weather: weatherData.weather[0].main,
                main:{
                      temp: weatherData.main.temp,
                      pressure: weatherData.main.pressure,
                      humidity: weatherData.main.humidity
                    },

                wind: weatherData.wind.speed,
                clouds: weatherData.clouds.all,
                sys:{
                      countryCode:weatherData.sys.country,
                      sunRise: weatherData.sys.sunrise,
                      sunSet: weatherData.sys.sunset
                    }

                 };

             cityArray.push(obj);
             console.log(cityArray);
          }
       
    }
    catch(error)
    {
     console.log(error);
    }


    sortCityArray(); 
}


function getCityName(){
    const cityKaNam = inputFeild.value;
    const cityName  = cityKaNam.trim().toLowerCase();

    if(cityName === ""){
        return;
    }

    fetchWeatherData(cityName); 
    
}

findButton.addEventListener('click', getCityName);


function displayData(){
    weatherdataContainer.innerHTML = "";

           cityArray.forEach((card)=>{

            const cardCon = document.createElement("div");
             cardCon.classList.add("card");

            const cardData = `

                <div class="left">
                    <div class="temp">
                        <div>
                            ${card.main.temp.toFixed(1)}<sup>o</sup>
                        </div>
                       
                    </div>

                     <div class="press-humid">
                        <span class="pre">P:${card.main.pressure}<sup>o</sup></span>
                        <span class="humi"> H :${card.main.humidity} <sup>o</sup></span>
                     </div>

                     <div class="city-name">
                        ${card.name}
                     </div>
                </div>

                <div class="right">
                    <div class="image-icon">
                        ${fetchIcons(card.weather)}
                    </div>

                    <div class="desp">
                        ${card.weather}
                    </div>

                </div>
            `;
             cardCon.innerHTML = cardData;
             weatherdataContainer.appendChild(cardCon);

           });
}