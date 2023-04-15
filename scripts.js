const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const countriesContainer = document.querySelector('.countries');

const apiKey = '0e3fadc85dad183bdaef27995f656fb9';
let city = '';

const init = () => {
    const singleCountry = document.querySelector('.country');
    singleCountry.remove();
};

// search button
searchButton.addEventListener("click", function() {
  const query = searchInput.value;
  if (query === '') { 
    countriesContainer.style.opacity = 0;
    return;
  } else {
   let capitalized = query.toUpperCase();
   city = capitalized;
   fetchData() 
    } 
  });

  // Search Enter button
 const keyFunc = () => {
    document.addEventListener("keydown", function (e) {
      if (e.key === '') {
        e.preventDefault();
      }
      if (e.key === "Enter") {
        searchButton.click();
    }
  })
}
keyFunc();

// fetch data
async function fetchData() {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=${apiKey}&units=metric`);
      if(!res.ok) {
        throw new Error('Please write a correct city');
      }
      const data = await res.json();
      init();
      document.querySelector('.error').textContent = '';
       // render country 
       renderCountry(data);
    } catch (error) {
      console.error('Error fetching data:',error);
      document.querySelector('.error').textContent = `${error}`;
    }
  }

  // render elements
const renderCountry = function(data) {
  let icon = '';
 const html = `
    <article class="country">
    <img class="country__img" src="">
    <div class="country__data">
    <h3 class="country__name">${city}</h3>
    <h4 class="country__region">${data.sys.country}</h4>
    <div class="weather__flex">
    <h4 class="weather__icon"><span class="icon"></span></h4>
    <h2 class="weather__icon">${Math.round(data.main.temp)}°</h2>
    </div>
    <h4 class="country__region">${data.weather[0].main}</h4>
    <h4 class="country__region">${'Humidity: '}${data.main.humidity}%</h4>
    <h4 class="country__region">${'Wind: '}${Math.round(data.wind.speed)} KM/H</h4>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;

 // Switch images weather
  const image = document.querySelector('.country__img');  
  switch(data.weather[0].main) {
    case 'Clouds': 
    image.src= 'img/clouds.jpg';
    document.querySelector('.icon').textContent = '☁️';
    break;
    case 'Rain': 
    image.src = 'img/rain.jpg';
    document.querySelector('.icon').textContent = '🌧️';
    break;
    case 'Snow': 
    image.src = 'img/snow.jpg';
    document.querySelector('.icon').textContent = '🌨️';
    break;
    case 'Clear': 
    image.src = 'img/clear.jpg';
    document.querySelector('.icon').textContent = '☀️';
    break;
    case 'Mist': 
    image.src = 'img/mist.jpg';
    document.querySelector('.icon').textContent = '😮';
    break;
    default: 
    image.src ='img/default.jpg';  
 }
};









  