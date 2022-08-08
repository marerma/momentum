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
  return 'Morning'
} else if (hours >= 12 && hours <= 17) {
  return 'Afternoon'
} else if (hours >= 18 && hours <= 23) {
  return 'Evening'
} else if (hours >= 0 && hours <= 6) {
  return 'Night'
}
}

//name
const userName = document.querySelector('.name')

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)