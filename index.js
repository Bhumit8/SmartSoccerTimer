// variables to store hours minutes and seconds of player 1
var hours = 0;
var minutes = 0;
var seconds = 0;
var milliseconds = 0

// selecting the timer displays
const timerDisplay = document.getElementById('timer-display');

const team1Score = document.getElementById("team1-score");
const team2Score = document.getElementById("team2-score");

const team1IncreaseScoreBtn = document.getElementById('increaseScore1');
const team1DecreaseScoreBtn = document.getElementById('decreaseScore1');

const team2IncreaseScoreBtn = document.getElementById('increaseScore2');
const team2DecreaseScoreBtn = document.getElementById('decreaseScore2');

const team1NameInput = document.getElementById('team1-input');
const team2NameInput = document.getElementById('team2-input');

const team1Name = document.getElementById('team1Name');
const team2Name = document.getElementById('team2Name');

// selecting the start button
const startBtn = document.getElementById('start-button');
startBtn.setAttribute('disabled', 'true');

const setBtn = document.getElementById('set-button');
const stopBtn = document.getElementById('stop-button');

var team1ScoreValue = 0;

var team2ScoreValue = 0;

// interval for timer
var interval = -1;
var timerEnd = false;

function setTeamNames(){
    team1Name.innerText = team1NameInput.value;
    team2Name.innerText = team2NameInput.value;
}

function increaseScore1(){
    if(team1ScoreValue < 99){
        team1ScoreValue += 1;
        team1Score.innerText = (team1ScoreValue < 10 ? "0" + team1ScoreValue : team1ScoreValue);
    }
}

function decreaseScore1(){
    if(team1ScoreValue >= 1){
        team1ScoreValue -= 1;
        team1Score.innerText = (team1ScoreValue < 10 ? "0" + team1ScoreValue : team1ScoreValue);
    }
}

function increaseScore2(){
    if(team2ScoreValue < 99){
        team2ScoreValue += 1;
        team2Score.innerText = (team2ScoreValue < 10 ? "0" + team2ScoreValue : team2ScoreValue);
    }
}

function decreaseScore2(){
    if(team2ScoreValue >= 1){
        team2ScoreValue -= 1;
        team2Score.innerText = (team2ScoreValue < 10 ? "0" + team2ScoreValue : team2ScoreValue);
    }
}

function disableStartBtn(){
    if(hours !=0 || minutes != 0 || seconds != 0){
        startBtn.setAttribute('disabled', 'true');
        setBtn.setAttribute('disabled', 'true');
        timerDisplay.classList.remove('heartBeat')
    }   
}

function enableStartBtn(){
    if(timerEnd == true){
        startBtn.removeAttribute('disabled');
        timerEnd = false;
    }
}

// run timer function for timer
function runTimer(){
    if(hours !=0 || minutes != 0 || seconds != 0){
        if(interval == -1){
            interval = setInterval(countDown, 1000);
        } else {
            clearInterval(interval);
            interval = -1;
        }
    }
}

// count down function for timer - decrements the timer
function countDown(){
    timerDisplay.innerText = (hours < 10 ? "0" + hours : hours) + ":" 
    + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    if(seconds <= 10 && minutes <= 0 && hours <= 0){
        timerDisplay.style.color = "red";
        timerDisplay.classList.add('heartBeat');
    }
   
    if(seconds >= 0){
        
        seconds--;
    }
    if(seconds < 0 && minutes > 0){
        seconds = 59;
        minutes--;
    }
    if(seconds <= 0 && minutes <= 0 && hours > 0){
        minutes = 59;
        seconds = 59;
        hours--;
    }
    if(seconds <= 0 && minutes <= 0 && hours <= 0){
        clearInterval(interval);
        interval = -1;
        timerEnd = true;
        setBtn.removeAttribute('disabled');
        timerDisplay.classList.remove('heartBeat');
    } 

    timerDisplay.innerText = (hours < 10 ? "0" + hours : hours) + ":" 
    + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    console.log(seconds);

}


function stopTimer(){
    if(hours !=0 || minutes != 0 || seconds != 0){
        setBtn.removeAttribute('disabled');
        startBtn.removeAttribute('disabled');
        timerDisplay.classList.remove('heartBeat');
        clearInterval(interval);
        interval = -1;
        timerEnd = true;
    }
}

// sets the chess clock time
function setClock(){
    setTeamNames();
    timerDisplay.style.color = "white";
    
    var hoursInput = document.getElementById('duration-hours').value;
    var minutesInput = document.getElementById('duration-minutes').value;
    var secondsInput = document.getElementById('duration-seconds').value;

    if(minutesInput < 0 || secondsInput < 0 ||  hoursInput < 0){
        errorDiv.innerText = "Hours, Minutes, or Seconds cannot be less than 0";
    } else if(minutesInput > 59 || secondsInput > 59 || hoursInput > 99){
        errorDiv.innerText = 'Hours, Minutes, or Seconds exceed input limit';
    } else if(hoursInput != "" && minutesInput != "" && secondsInput != ""){
        errorDiv.innerText = "";
        hours = hoursInput;
        minutes = minutesInput;
        seconds = secondsInput;

        timerDisplay.innerText = (hours < 10 ? "0" + hours : hours) + ":" 
        + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

        startBtn.removeAttribute('disabled');
    } else{
        errorDiv.innerText = "Please fill all input fields with a duration";
    }
}

// start button to call runTimer2 function
startBtn.addEventListener('click', runTimer);
startBtn.addEventListener('click', disableStartBtn);

// buttons to set the clock
setBtn.addEventListener('click', setClock);
setBtn.addEventListener('click', enableStartBtn);

// button to stop the clock
stopBtn.addEventListener('click', stopTimer);

team1IncreaseScoreBtn.addEventListener('click', increaseScore1);
team1DecreaseScoreBtn.addEventListener('click', decreaseScore1);

team2IncreaseScoreBtn.addEventListener('click', increaseScore2);
team2DecreaseScoreBtn.addEventListener('click', decreaseScore2);


