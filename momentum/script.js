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

let tasks = []

function setLangSetting () {
let arraySettings = Array.from(settingItems)
for (let i = 0; i < arraySettings.length; i++) {
  arraySettings[i].textContent = `${langArr['settings-blocks'][langDefault][i]}`
}
document.querySelector('.settings-block-option').textContent = `${langArr['settings-option'][langDefault]}`
document.querySelector('.settings-block-pic').textContent = `${langArr['settings-pic'][langDefault]}`
document.querySelector('.todo-title').textContent = `${langArr['todo'][langDefault]}`
}

function changeLangSetting () {
  let arraySettings = Array.from(settingItems)
  for (let i = 0; i < arraySettings.length; i++) {
    arraySettings[i].textContent = `${langArr['settings-blocks'][langSelected][i]}`
  }
  document.querySelector('.settings-block-option').textContent = `${langArr['settings-option'][langSelected]}`
  document.querySelector('.settings-block-pic').textContent = `${langArr['settings-pic'][langSelected]}`
  document.querySelector('.todo-title').textContent = `${langArr['todo'][langSelected]}`  
}

const city = document.querySelector('.city')


const greeting = document.querySelector('.greeting')
let timeOfDay = getTimeOfDay()
setLanguageDefault()
let langSelected = langName.textContent


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

  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city')
  } else {city.value = langArr['city'][langDefault]
  }
    
    let greetName = document.querySelector('.placeholderName')
    greetName.setAttribute('placeholder', langArr['placeholderName'][langDefault])
    greeting.textContent = `${langArr[timeOfDay][langDefault]},` 
    language = langArr['lang'][langDefault]
    speed = `${langArr['weather'][langDefault][2]}`
    windSpeed = `${langArr['weather'][langDefault][0]}`
    humidityScale = `${langArr['weather'][langDefault][1]}`
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
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city')
    } else city.value = langArr['city'][langSelected]    
    changeLangSetting ()
}


const userName = document.querySelector('.name')

const body = document.querySelector('body')
const sliderNext = document.querySelector('.slide-next')
const sliderPrev = document.querySelector('.slide-prev')

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let bgNum = getRandomNum(1, 20)
const selectedSrc = document.querySelectorAll('.picsource-item')
let urlPicture


function setBg () {
    let numString = bgNum.toString().padStart(2, "0")
    const timeOfDay =  getTimeOfDay()
    const bgUrl = `https://raw.githubusercontent.com/marerma/stage1-tasks/assets/images/${timeOfDay}/${numString}.jpg`
    const img = new Image()
    img.src = bgUrl
    img.onload = () => {
     body.style.backgroundImage = `url(${bgUrl})`
     }
  }

setBg()

function getNextSlide () {
  getCheckedBtn ()
  switch(urlPicture){
    case 'api':  
    setBgAPI ()
    break 
    case 'flickr': 
    setBgFlickr ()
    break
    case 'git': 
    if (bgNum != 20) {
      bgNum = bgNum + 1
    } else {
      bgNum = 1
    } 
    setBg(bgNum)
  } 
}

function getPrevSlide () {
  getCheckedBtn ()
  switch(urlPicture){
    case 'api':  
    setBgAPI ()
    break 
    case 'flickr':
    setBgFlickr ()
    break
    case 'git': 
    if (bgNum > 1) {
      bgNum = bgNum - 1
    } else {
      bgNum = 20
    } setBg(bgNum) 
  }
}

const formPic = document.querySelector('.picsource')

formPic.addEventListener("click", chooseSource)

  function getCheckedBtn () {
    let a = Array.from(selectedSrc)
    a.forEach(el => {
      if (el.checked) {
        urlPicture = el.value
      } return urlPicture
    })
  }


function chooseSource () {
  getCheckedBtn ()
  if (urlPicture === 'api') {
    setBgAPI ()
  } else if (urlPicture === 'git') {
    setBg()
  } else if (urlPicture === 'flickr') {
    setBgFlickr()
  }
}

async function setBgAPI () {
  const timeOfDay =  getTimeOfDay()
  let u = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=0E9b0WsHpRiczJXUwyigvEnJBdZwcDRh11Rxf4k3ZN8`
  const resApi = await fetch(u)
  const data = await resApi.json()
  let imageLink = data.urls.regular
  const img = new Image()
  img.src = imageLink
  img.onload = () => {
   body.style.backgroundImage = `url(${imageLink})`
   }
}

async function setBgFlickr () {
  let numString = getRandomNum(0, 35).toString()
  const timeOfDay =  getTimeOfDay()
  let u = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e5a03c21036c35c6b22e2259406e2ff2&tags=${timeOfDay},nature&tag_mode=all&extras=url_l&format=json&nojsoncallback=1&sort=relevance`
  const resApi = await fetch(u)
  const data = await resApi.json()
  let imageLink = data.photos.photo[numString].url_l
  const img = new Image()
  img.src = imageLink
  img.onload = () => {
   body.style.backgroundImage = `url(${imageLink})`
   }
}

sliderNext.addEventListener('click', getNextSlide)
sliderPrev.addEventListener('click', getPrevSlide)


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

  temp.textContent = `${Math.round(weatherData.main.temp)}??C`
  weatherDescription.textContent = weatherData.weather[0].description
  wind.textContent = `${windSpeed}: ${Math.round(weatherData.wind.speed)} ${speed}` //`Wind speed: ${Math.round(weatherData.wind.speed)} m/s`
  humidity.textContent = `${humidityScale}: ${weatherData.main.humidity}%`
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`)

  }
  catch (error) {
    city.value = "??????????"
    localStorage.setItem('city', city.value)
    alert('Enter a correct name of the city')
}
}

getWeather()
city.addEventListener('change', getWeather)


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
getQuotes();


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
   playAudio()
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
const todoBlock = document.querySelector('.todocontainer')

let settingValue = document.querySelectorAll('.setting-item-range')
const settingsList = [playerBlock, weatherBlock, dateBlock, greetBlock, quoteBlock, todoBlock]
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
 },
 {
  'inputIndex': '5',
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
  localStorage.setItem('picsrc', urlPicture);
  updateLocalStorage ()
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

if(localStorage.getItem('taskList')) {
  tasks = JSON.parse(localStorage.getItem('taskList'))
  addHTMLlist() 
}

if(localStorage.getItem('picsrc')) {
  let allRadiobtn = Array.from(document.querySelectorAll('.picsource-item'))
   urlPicture = localStorage.getItem('picsrc')
   allRadiobtn.forEach((el)=>{
    el.checked = false
    if (el.value === urlPicture) {
      el.checked = true
    }
  })
   chooseSource ()
}  
}

window.addEventListener('load', getLocalStorage)


const addTaskBtn = document.querySelector('.addBtn')
const descriptionTask = document.getElementById('descriptionTask')
const taskList = document.querySelector('.todo-list')
let elements = []
let deleteBtn = []

function Task(description) {
  this.description = description;
  this.done = false;
}


addTaskBtn.addEventListener('click', addTask)

function addTask () {
  tasks.push(new Task(descriptionTask.value))
  updateLocalStorage ()
  addHTMLlist () 
  descriptionTask.value =''
}

function updateLocalStorage () {
  localStorage.setItem('taskList', JSON.stringify(tasks))
}

function addHTMLlist () {
  taskList.innerHTML = ''
  if (tasks.length > 0) {
    filterTasks()
    tasks.forEach((el, index) => {
      taskList.innerHTML += makeTaskElement(el, index)
    })
  }
  elements = document.querySelectorAll('.todo-item')
  deleteBtn = document.querySelectorAll('.deletebtn')
}

function filterTasks () {
  if (tasks.length > 0) {
    const activeTasks = tasks.filter(el => el.done === false)
    const finishedTasks = tasks.filter(el => el.done === true) 
      tasks = [...activeTasks, ...finishedTasks]
    }
}   

function makeTaskElement (task, index) {
  return `<li class="todo-item ${task.done? 'deleted' : ''}">${index+1}. ${task.description}
  <input id="${index}" class="checkboxbtn ${task.done? 'checked' : ''}" type="checkbox" ${task.done? 'checked': ''}>
  <button class="deletebtn">X</button>
</li>`
}

taskList.addEventListener('click',finishTask)
 
 function finishTask (event) {
    let clickedItem = event.target 
    let index = Number(clickedItem.id)
  if (clickedItem.classList.contains('checkboxbtn')) {
    tasks[index].done = !tasks[index].done
    if (tasks[index].done === true) {
      clickedItem.classList.add("checked")
      elements[index].classList.add("deleted")
    } else {
      clickedItem.classList.remove("checked")
      elements[index].classList.remove("deleted")
    }
  }
  updateLocalStorage()
}

function deleteTask(event) {
  let clickedItem = event.target 
  let index
  if (clickedItem.classList.contains('deletebtn')) {
      deleteBtn.forEach((el, ind) => {
        clickedItem === el ? index = ind : index
      })
      tasks.splice(index, 1)
      updateLocalStorage(
      addHTMLlist()
      )
  }
}


taskList.addEventListener('click',deleteTask)


const toDoBtn = document.querySelector('.todoicon')
toDoBtn.addEventListener('click', ()=> {
  if (document.querySelector('.todocontainer').classList.contains('hidden')) {
     document.querySelector('.todocontainer').classList.remove('hidden')
     settingsObject[5].value = '1'
     loadSettings()
  } else {
    document.querySelector('.todocontainer').classList.add('hidden')
    settingsObject[5].value = '0'
    loadSettings()
  }
})

