// scripts.js
let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = 'Stop';
    startStopBtn.style.backgroundColor = '#ffc107';
    running = true;
  } else {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#28a745';
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  startStopBtn.textContent = 'Start';
  startStopBtn.style.backgroundColor = '#28a745';
  difference = 0;
  running = false;
  laps = [];
  lapsContainer.innerHTML = '';
}

function lap() {
  if (running) {
    const lapTime = new Date().getTime() - startTime;
    laps.push(lapTime);
    displayLaps();
  }
}

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);
  
  display.textContent = 
    (hours < 10 ? '0' : '') + hours + ':' + 
    (minutes < 10 ? '0' : '') + minutes + ':' + 
    (seconds < 10 ? '0' : '') + seconds + '.' + 
    (milliseconds < 10 ? '0' : '') + milliseconds;
}

function displayLaps() {
  lapsContainer.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapElement = document.createElement('li');
    lapElement.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
    lapsContainer.appendChild(lapElement);
  });
}

function formatTime(time) {
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (hours < 10 ? '0' : '') + hours + ':' + 
         (minutes < 10 ? '0' : '') + minutes + ':' + 
         (seconds < 10 ? '0' : '') + seconds + '.' + 
         (milliseconds < 10 ? '0' : '') + milliseconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
