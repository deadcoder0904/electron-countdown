const moment = require('moment')

const { ipcRenderer } = require('electron')

const secondsToTime = (s) => {
	let momentTime = moment.duration(s, 'seconds')
  let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds()
  let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes()

  return `${min}:${sec}`
}

ipcRenderer.on('timer-change',(event, t) => {
	current = t
	console.log(timeDiv);
	timeDiv.innerHTML = secondsToTime(current)
	
	let i = setInterval(() => {
		current--
		timeDiv.innerHTML = secondsToTime(current)
		if(current <= 0)
			clearInterval(i)
	},1000)

})