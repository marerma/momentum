//time
const time = document.querySelector('.time')
const dateFull = document.querySelector('.date')

function showTime () {
  const date = new Date()
  const currentTime = date.toLocaleTimeString()
  time.textContent = currentTime
  setTimeout(showTime, 1000)
  showDate()
  getTimeOfDay();
}

function showDate () {
  const date = new Date()
  const options = {weekday: 'long', month: 'long', day: 'numeric'}
  const currentDate = date.toLocaleDateString('en-GB', options)
  dateFull.textContent = currentDate;
}

showTime()

//greetings
const greeting = document.querySelector('.greeting')
const timeOfDay = getTimeOfDay()
greeting.textContent = `Good ${timeOfDay},`

function getTimeOfDay () {
  const date = new Date()
  const hours = date.getHours()
if (hours >= 6 && hours <= 11) {
  return 'morning'
} else if (hours >= 12 && hours <= 17) {
  return 'afternoon'
} else if (hours >= 18 && hours <= 23) {
  return 'evening'
} else if (hours >= 0 && hours <= 6) {
  return 'night'
}
}

//name
const userName = document.querySelector('.name')

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }

  if(localStorage.getItem('city'))
  city.value = localStorage.getItem('city')
}
window.addEventListener('load', getLocalStorage)

//bg and slider
const body = document.querySelector('body')
const sliderNext = document.querySelector('.slide-next')
const sliderPrev = document.querySelector('.slide-prev')

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let bgNum = getRandomNum(1, 20)

function setBg (num) {
  let numString = num.toString().padStart(2, "0")
  const timeOfDay =  getTimeOfDay()
  const bgUrl = `https://raw.githubusercontent.com/marerma/stage1-tasks/assets/images/${timeOfDay}/${numString}.jpg`
  const img = new Image()
  img.src = bgUrl
  img.onload = () => {
    body.style.backgroundImage = `url(${bgUrl})`
  }
}

setBg(bgNum)

function getNextSlide () {
  if (bgNum != 20) {
    bgNum = bgNum + 1
  } else {
    bgNum = 1
  } 
   setBg(bgNum)
}

function getPrevSlide () {
  if (bgNum > 1) {
    bgNum = bgNum - 1
  } else {
    bgNum = 20
  }
   setBg(bgNum)
}

sliderNext.addEventListener('click', getNextSlide)
sliderPrev.addEventListener('click', getPrevSlide)

//weather
const city = document.querySelector('.city')

const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather () {
  try {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=baeee116da709abcca87c1e3328ee937&units=metric`
  const result = await fetch(url)
  const weatherData = await result.json()

  temp.textContent = `${Math.round(weatherData.main.temp)}°C`
  weatherDescription.textContent = weatherData.weather[0].description
  wind.textContent = `Wind speed: ${Math.round(weatherData.wind.speed)} m/s`
  humidity.textContent = `Humidity: ${weatherData.main.humidity}%`
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`)
  }
  catch (error) {
    city.value = 'Minsk'
    localStorage.setItem('city', city.value)
    alert('Enter a correct name of the city')
  }
}

getWeather()
city.addEventListener('change', getWeather)


//quotes
let quoteText = document.querySelector('.quote')
let quoteAuthor = document.querySelector('.author')
const buttonQuote = document.querySelector('.change-quote')

async function getQuotes() {  
  const quotes = './assets/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let numberOfQuote = getRandomNum(0, data.quotes.length) 
  quoteText.textContent = `"${data.quotes[numberOfQuote].quote}"`
  quoteAuthor.textContent = data.quotes[numberOfQuote].author
}

buttonQuote.addEventListener('click', getQuotes)
getQuotes();

//audioplayer

import playList from './audio/play-list.js'

const play = document.querySelector('.play')
const playNext = document.querySelector('.play-next')
const playPrev = document.querySelector('.play-prev')

const audio = new Audio()
let isPlay = false
let songNum = 0
let isMuted = false

function changePauseCLass () {
  if (!isPlay) {
    play.classList.remove('pause')
  } else {
    play.classList.add('pause')
  }
}

function playAudio () {
  if (!isPlay) { 
    playSong()
  } else {
    pauseSong()
  }
}

function playSong () { 
  audio.src = playList[songNum].src
  audio.currentTime = 0
  isPlay = true
  audio.play() 
  changePauseCLass()
  changeClassActiveSong ()
 }

 function pauseSong () {
  audio.pause();
  isPlay = false
  changePauseCLass()
  changeClassActiveSong ()
 }


function nextSong () {
  if (songNum < playList.length - 1) {
    songNum += 1
  } else {
    songNum = 0
  }
  playSong()
}


function prevSong () {
  if (songNum === 0) {
    songNum = playList.length - 1
  } else {
    songNum -= 1
  }
  playSong()
}

play.addEventListener('click', playAudio)
playNext.addEventListener('click', nextSong)
playPrev.addEventListener('click', prevSong)


const playListElement = document.querySelector('.play-list')
const songList = playListElement.childNodes

 playList.forEach(el => {
  const li = document.createElement('li')
  playListElement.append(li)
  li.textContent = el.title
  li.classList.add('play-item')
})

function changeClassActiveSong () {
  let a = Array.from(songList)
  for (let i = 0; i < a.length; i++) {
      if (i === songNum){
        a[i].classList.add('item-active')
      } else {
        a[i].classList.remove('item-active')
        a[i].classList.add('play-item')
  }
  }}

audio.addEventListener('ended', (event) => nextSong())

//advanced player
const volumeBtn = document.querySelector('.volume-icon')
const volumeRange = document.querySelector('.volume-range')

function mute () {
  volumeBtn.classList.add('volume-icon-mute')
  isMuted = true
  audio.muted = true
  volumeRange.value = 0
}

function unmute () {
  volumeBtn.classList.remove('volume-icon-mute')
  audio.muted = false
  isMuted = false
  volumeRange.value = 50
}

function muteGeneral () {
  if (!isMuted) {
  mute()
} else {
  unmute()
}
}

function changeVolume () {
  let v = volumeRange.value
  audio.volume = v / 100
}

volumeRange.addEventListener('input', changeVolume)
volumeBtn.addEventListener('click', muteGeneral)
