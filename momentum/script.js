//time
const time = document.querySelector('.time')
const dateFull = document.querySelector('.date')

function showTime () {
  const date = new Date()
  const currentTime = date.toLocaleTimeString()
  time.textContent = currentTime
  setTimeout(showTime, 1000)
  showDate();
}

function showDate () {
  const date = new Date()
  const options = {weekday: 'long', month: 'long', day: 'numeric'}
  const currentDate = date.toLocaleDateString('en-GB', options)
  dateFull.textContent = currentDate;
}

showTime()
