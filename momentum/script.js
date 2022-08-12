//time


const time = document.querySelector('.time')
const dateFull = document.querySelector('.date')

const langName = document.querySelector('.lang-name')
let langList = ['En', 'Ru']
const langBtn = document.querySelector('.lang-icon')
let langDefault = langList[1]

let language
let windSpeed;
let humidityScale;
let url
let speed
let settingItems = document.querySelectorAll('.setting-item-name')


function setLangSetting () {
let arraySettings = Array.from(settingItems)
for (let i = 0; i < arraySettings.length; i++) {
  arraySettings[i].textContent = `${langArr['settings-blocks'][langDefault][i]}`
}
document.querySelector('.settings-block-option').textContent = `${langArr['settings-option'][langDefault]}`
}

function changeLangSetting () {
  let arraySettings = Array.from(settingItems)
  for (let i = 0; i < arraySettings.length; i++) {
    arraySettings[i].textContent = `${langArr['settings-blocks'][langSelected][i]}`
  }
  document.querySelector('.settings-block-option').textContent = `${langArr['settings-option'][langSelected]}`
  }

const city = document.querySelector('.city')


//greetings
const greeting = document.querySelector('.greeting')
let timeOfDay = getTimeOfDay()
setLanguageDefault()
let langSelected = langName.textContent

/*greeting.textContent = //`Good ${timeOfDay},`*/

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
  const currentDate = date.toLocaleDateString(language, options)
  dateFull.textContent = currentDate;
}

showTime()

import langArr from './locals/lang.js'

langBtn.addEventListener('click', changeLanguageName)

function changeLanguageName () {
  if (langSelected === langList[0]) {
     langName.textContent = langList[1] 
     langSelected = langList[1]
     changeLanguage () 
  } else {
    langName.textContent = langList[0]
    langSelected = langList[0] 
    changeLanguage ()
  }
}

function setLanguageDefault () {
  if(localStorage.getItem('language')) {
    langName.textContent =  localStorage.getItem('language')
  } else {
    langName.textContent = langDefault
  }
    
    let greetName = document.querySelector('.placeholderName')
    greetName.setAttribute('placeholder', langArr['placeholderName'][langDefault])
    greeting.textContent = `${langArr[timeOfDay][langDefault]},` 
    language = langArr['lang'][langDefault]
    speed = `${langArr['weather'][langDefault][2]}`
    windSpeed = `${langArr['weather'][langDefault][0]}`
    humidityScale = `${langArr['weather'][langDefault][1]}`
    city.value = langArr['city'][langDefault]
    city.setAttribute('placeholder', langArr['city'][langDefault])
    setLangSetting ()
  }

function changeLanguage () {
    let greetName = document.querySelector('.placeholderName')
    language = langArr['lang'][langSelected]
    greetName.setAttribute('placeholder', langArr['placeholderName'][langSelected])
    greeting.textContent  = `${langArr[timeOfDay][langSelected]},`
    getWeather ()
    getQuotes()
    speed = `${langArr['weather'][langSelected][2]}`
    windSpeed = `${langArr['weather'][langSelected][0]}`
    humidityScale = `${langArr['weather'][langSelected][1]}`
    city.setAttribute('placeholder', langArr['city'][langSelected])
    city.value = langArr['city'][langSelected]
    changeLangSetting ()
}

//name
const userName = document.querySelector('.name')



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



const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather () {
  try {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=baeee116da709abcca87c1e3328ee937&units=metric`
  const result = await fetch(url)
  const weatherData = await result.json()

  temp.textContent = `${Math.round(weatherData.main.temp)}°C`
  weatherDescription.textContent = weatherData.weather[0].description
  wind.textContent = `${windSpeed}: ${Math.round(weatherData.wind.speed)} ${speed}` //`Wind speed: ${Math.round(weatherData.wind.speed)} m/s`
  humidity.textContent = `${humidityScale}: ${weatherData.main.humidity}%`
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`)

  }
  catch (error) {
    city.value = "Минск"
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
  const quotes = `./assets/quotes-${language}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  let numberOfQuote = getRandomNum(0, data.quotes.length - 1) 
  quoteText.textContent = `"${data.quotes[numberOfQuote].quote}"`
  quoteAuthor.textContent = data.quotes[numberOfQuote].author
}

buttonQuote.addEventListener('click', getQuotes)
//getQuotes();

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
  audio.volume = 0.2
  isPlay = true
  audio.play() 
  trackName.textContent = playList[songNum].title
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
        a[i].classList.add('play-item-active')
      } else {
        a[i].classList.remove('play-item-active')
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

const progressBar = document.querySelector('.track')
audio.ontimeupdate = progressUpdate
progressBar.onclick = audioControl
const currentTrackTime = document.querySelector('.currentTrackTime')
const trackTime = document.querySelector('.trackTime')
const trackName = document.querySelector('.track-name')

function progressUpdate () {
  let duration = audio.duration
  let current = audio.currentTime

  if (isNaN(current / duration * 100)) {
    progressBar.value = 0.0001
  } else {
    progressBar.value = current / duration * 100
  }
  
  const trackDuration = new Date(duration*1000);
  let currentTime = new Date(current*1000)
  trackTime.textContent = `${trackDuration.getMinutes()}:${trackDuration.getSeconds()}`
  let currentSec = currentTime.getSeconds().toString().padStart(2, '0')
  currentTrackTime.textContent = `${currentTime.getMinutes()}:${currentSec}`

}

playListElement.addEventListener('click', clickTrackTitle)

function clickTrackTitle (event) {
  let clickedTrack = event.target
  let trackTitle = clickedTrack.textContent
  playList.forEach((el, index)=> {
    if (trackTitle === el.title) {
      songNum = index
      playSong() //подумать над паузой и плеем при переключении
      }
    })
}

function audioControl () {
  let width = progressBar.offsetWidth
  let pointer = event.offsetX
  progressBar.value = pointer / width * 100
  audio.pause()
  audio.currentTime = audio.duration * (pointer / width)
  audio.play()
}

//settings
const setBtn = document.querySelector('.setting-icon')
const setBlock = document.querySelector('.settings-container')
setBtn.addEventListener('click', openSettings)

function openSettings () {
  setBlock.classList.toggle('visible')
}


const playerBlock = document.querySelector('.player')
const weatherBlock = document.querySelector('.weather')
const dateBlock = document.querySelector('.date')
const greetBlock = document.querySelector('.greeting-container')
const quoteBlock = document.querySelector('.quote-block')

let settingValue = document.querySelectorAll('.setting-item-range')
const settingsList = [playerBlock,weatherBlock,dateBlock,greetBlock,quoteBlock]
let arraySetInput = Array.from(settingValue)

let settingsObject = [
  {
 'inputIndex': '0',
 'value': '1'
},
{
  'inputIndex': '1',
  'value': '1'
 },
 {
  'inputIndex': '2',
  'value': '1'
 },
 {
  'inputIndex': '3',
  'value': '1'
 },
 {
  'inputIndex': '4',
  'value': '1'
 }
]


function loadSettings () {
  arraySetInput.forEach((el, index)=> {
    el.setAttribute('value', settingsObject[index]['value'])
    if (el.value === '1') {
      settingsList[index].classList.remove('hidden')
    } else {
      settingsList[index].classList.add('hidden')
    }
  })
}


function changeSetting (event) {
  let clickedInput = event.target
  let inputIndex = Number(clickedInput.id)
  settingsList[inputIndex].classList.toggle('hidden')
  x(inputIndex)
}

function x (a) {
  settingsObject[a].value = arraySetInput[a].value
 return settingsObject
}

arraySetInput.forEach((el)=> {
  el.addEventListener('input', changeSetting)
})


function setLocalStorage() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('settings', JSON.stringify(settingsObject));
  localStorage.setItem('language', langSelected);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }

  if(localStorage.getItem('city')) {
  city.value = localStorage.getItem('city')
}

if(localStorage.getItem('settings')) {
  let a = localStorage.getItem('settings');
  settingsObject = JSON.parse(a);
  loadSettings()
}

if(localStorage.getItem('language')) {
  langDefault = localStorage.getItem('language')
  language = langArr['lang'][localStorage.getItem('language')]
  setLanguageDefault()
  getQuotes()
  getWeather ()
}
}
window.addEventListener('load', getLocalStorage)

