let timerDisplay = document.getElementById('timer');
let timesList = document.getElementById('times');
let clearBtn = document.getElementById('clear-btn');

let timer = null;
let startTime = 0;
let isRunning = false;
let isArmed = false;
let spaceDownTime = 0;
let holdTimeout = null;
let waitingForRelease = false;

let times = [];

// Load times from localStorage (persist across sessions)
if (localStorage.getItem('cube_times')) {
  try {
    times = JSON.parse(localStorage.getItem('cube_times'));
  } catch (e) {
    times = [];
  }
}

function formatTime(ms) {
  let totalMilliseconds = ms;
  let milliseconds = totalMilliseconds % 1000;
  let totalSeconds = Math.floor(totalMilliseconds / 1000);
  let seconds = totalSeconds % 60;
  let totalMinutes = Math.floor(totalSeconds / 60);
  let minutes = totalMinutes % 60;
  let hours = Math.floor(totalMinutes / 60);

  let h = hours > 0 ? (String(hours).padStart(0, '0') + ':') : '';
  let m = String(minutes).padStart(0, '0');
  let s = String(seconds).padStart(2, '0');
  let msStr = String(milliseconds).padStart(2, '0');
  return h + m
   + ':' + s + '.' + msStr;
}

function updateTimer() {
  if (isRunning) {
    let now = Date.now();
    timerDisplay.textContent = formatTime(now - startTime);
    timer = requestAnimationFrame(updateTimer);
  }
}

function addTime(ms) {
  times.unshift(ms); // Add to front (latest on top)
  if (times.length > 100) times = times.slice(0, 100);
  localStorage.setItem('cube_times', JSON.stringify(times));
  renderTimes();
}

function renderTimes() {
  timesList.innerHTML = '';
  if (times.length === 0) {
    let li = document.createElement('li');
    li.textContent = "No solves yet!";
    li.style.color = "#777";
    timesList.appendChild(li);
  } else {
    times.forEach((t, i) => {
      let li = document.createElement('li');
      li.textContent = formatTime(t);
      timesList.appendChild(li);
    });
  }
}

clearBtn.onclick = function() {
  if (confirm("Are you sure you want to clear all solves?")) {
    times = [];
    localStorage.removeItem('cube_times');
    renderTimes();
  }
};

window.addEventListener('keydown', function(e) {
  if (e.code === 'Space' && !waitingForRelease) {
    if (isRunning) {
  // Stop timer
      isRunning = false;
      cancelAnimationFrame(timer);
      let solveTime = Date.now() - startTime;
      timerDisplay.textContent = formatTime(solveTime);
      addTime(solveTime);
      waitingForRelease = true;
    } else if (!isArmed && !holdTimeout) {
      // Prepare to arm
      spaceDownTime = Date.now();
      holdTimeout = setTimeout(() => {
        isArmed = true;
        timerDisplay.style.color = "#27ae60";
        document.querySelectorAll('body > *:not(#timer)').forEach(el => {
          el.style.display = 'none';
        });
        timerDisplay.textContent = "0.00";
        timerDisplay.style.margin = "200px"
      }, 1000); // 1 second
      timerDisplay.style.color = "#FF0000"

    }
  }
});

window.addEventListener('keyup', function(e) {
  if (e.code === 'Space') {
    if (isRunning) {
      // Prevent double triggering
      waitingForRelease = false;
    } else if (isArmed) {
      // Start timer
      isRunning = true;
      isArmed = false;
      timerDisplay.style.color = "#fff";
      startTime = Date.now();
      timer = requestAnimationFrame(updateTimer);
    } else {
      // Not armed: didn't hold long enough
      let held = Date.now() - spaceDownTime;
      if (holdTimeout) {
        clearTimeout(holdTimeout);
        holdTimeout = null;
      }
      document.querySelectorAll('body > *:not(#timer)').forEach(el => {
        el.style.display = '';
      });
      timerDisplay.style.color = "#fff";

    }
  }
});

// Prevent page scrolling with space
window.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    e.preventDefault();
  }
});

// Reset everything if user presses space after stopping
window.addEventListener('keyup', function(e) {
  if (e.code === 'Space' && waitingForRelease) {
    waitingForRelease = false;
    timerDisplay.style.margin = "auto"
  }
});

renderTimes();