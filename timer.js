var timerDisplay = document.getElementById('timerDisplay'),
    average5 = document.getElementById('average5'),
    average12 = document.getElementById('average12'),
    numTimes5 = document.getElementById('numTimes5'),
    numTimes12 = document.getElementById('numTimes12'),
    totalAverage = document.getElementById('totalAverage');

var miliseconds = 0, seconds = 0, minutes = 0, t;
var timerStopped = true, continueRunning = true;
var array5 = [], array12 = [], arrayTotal = [];

function timer() {
  miliseconds++;
    if(miliseconds >= 100) {
      miliseconds = 0;
      seconds++;
      if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
              minutes = 0;
              hours++;
          }
      }
    }

    timerDisplay.innerHTML = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
    (seconds > 9 ? seconds : "0" + seconds) + ":" +
    (miliseconds > 9 ? miliseconds : "0" + miliseconds);

  t = setTimeout(timer, 10);
}

function timerControl() {
  if(continueRunning) {
    //pause
    if(!timerStopped) {
      clearTimeout(t);
      getAverages(minutes, seconds, miliseconds, array5, 5);
      getAverages(minutes, seconds, miliseconds, array12, 12);
      getAverages(minutes, seconds, miliseconds, arrayTotal, 0);
      numTimes5.innerHTML = 5-array5.length;
      numTimes12.innerHTML = 12-array12.length;
      continueRunning = false;
      var pause = setTimeout(pause, 300); //prevents multiple clicks quickly restarting timer
      timerStopped = true;
    }
    //start
    else {
      timerDisplay.innerHTML = "00:00:00";
      miliseconds = 0;
      seconds = 0;
      minutes = 0;
      timer();
      continueRunning = false;
      var pause = setTimeout(pause, 100);
      timerStopped = false;
    }
  }
  function pause() {
    continueRunning = true;
  }
}

function getAverages(minutes, seconds, miliseconds, arr, which) {
    timeInMili = ((minutes*60)+seconds)*100+miliseconds
    arr.push(timeInMili);
    if((which == 5 && arr.length==5) || (which == 12 && arr.length==12) || !which) {
      var total = 0;
      for(var i = 0; i < arr.length; i++) {
        total += arr[i];
      }
      var avg = total/ arr.length;
      var avgMins = Math.floor(avg/6000);
      var avgSecs = Math.floor(avg/100);
      var avgMili = Math.round(avg%100);
      updateText(avgMins, avgSecs, avgMili, which);
      if(which){
        arr.splice(0,1);
      }
    }
}

function updateText(avgMins, avgSecs, avgMili, which) {
  switch(which) {
    case 5:
      average5.innerHTML = (avgMins > 9 ? avgMins : "0" + avgMins) + ":" +   (avgSecs > 9 ? avgSecs : "0" + avgSecs) + ":" + (avgMili > 9 ? avgMili : "0" + avgMili);;
      break;
    case 12:
      average12.innerHTML = (avgMins > 9 ? avgMins : "0" + avgMins) + ":" +   (avgSecs > 9 ? avgSecs : "0" + avgSecs) + ":" + (avgMili > 9 ? avgMili : "0" + avgMili);;
      break;
    default:
      totalAverage.innerHTML = (avgMins > 9 ? avgMins : "0" + avgMins) + ":" +   (avgSecs > 9 ? avgSecs : "0" + avgSecs) + ":" + (avgMili > 9 ? avgMili : "0" + avgMili);;
      break;
  }
}

function reset() {
  if(!timerStopped) {
    clearTimeout(t);
    timerStopped = true;
  }//if the timer was running, stop it
  array5 = []; array12 = []; arrayTotal = []; //clear arrays
  timerDisplay.innerHTML = "00:00:00";
  numTimes5.innerHTML = 5;
  numTimes12.innerHTML = 12;
  average5.innerHTML = "<span id='numTimes5'>5</span> more";
  average12.innerHTML = "<span id='numTimes12'>12</span> more";
  totalAverage.innerHTML = "1 more";
  miliseconds = 0;
  seconds = 0;
  minutes = 0;
}
