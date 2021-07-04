
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

const team1AvatarDiv = document.getElementById('avatar1-img');
const team2AvatarDiv = document.getElementById('avatar2-img');

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


//Section For Calculator pop-up
// Get the modal
var modal = document.getElementById("finishModal");
$('#btnCal').click(function (e) {
    modal.style.display = "block";
});

function hideModal() {
    modal.style.display = "none";
    $('#finishModal').empty();
}
function wrap() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}
function score() {
    $('#modelCon').attr('display', 'none');
    modal.style.display = "block";

    wrap();
    $('#finishModal').fireworks();
    var audio = new Audio('woohoo.mp3'); // Replace this sound
    audio.play();
    destroy();

}

function destroy() {
    $('#finishModal').fireworks("destroy");

}



//************************************************Calculator Script************************************************//
$("#number0").click(function () {
    dis(0);
});
$("#number1").click(function () {
    dis(1);
});
$("#number2").click(function () {
    dis(2);
});
$("#number3").click(function () {
    dis(3);
});
$("#number4").click(function () {
    dis(4);
});
$("#number5").click(function () {
    dis(5);
});
$("#number6").click(function () {
    dis(6);
});
$("#number7").click(function () {
    dis(7);
});
$("#number8").click(function () {
    dis(8);
});
$("#number9").click(function () {
    dis(9);
});
$("#addition").click(function () {
    dis('+');
});
$("#substraction").click(function () {
    dis('-');
});
$("#point").click(function () {
    dis('.');
});
$("#division").click(function () {
    dis('/');
});
$("#multiplication").click(function () {
    dis('*');
});
$("#equal").click(function () {
    solve();
});
$("#clear").click(function () {
    clr();
});
$
$("#backarrow").click(function (e) {
    backspaceClear();
});


function backspaceClear() {

    var length = $('#result').val().length;
    var newResult = "";
    for (var i = 0; i < length - 1; i++) {
        newResult = newResult + $('#result').val()[i];
    }
    $('#result').val(newResult);
}
// keypress events for display.
$(document).keydown(function (e) {
    var key = e.keyCode;
    if (key >= 96 && key <= 105) {
        dis(key - 96);
    }
    if (key === 107) {
        dis('+');
    }
    if (key === 109) {
        dis('-');
    }
    if (key === 106) {
        dis('*');
    }
    if (key === 111) {
        dis('/');
    }
    if (key === 110) {
        dis('.');
    }
    if (e.keyCode === 8) {
        backspaceClear();
    }
});


//function that evaluates the digit and return result
function solve() {
    let x = document.getElementById("result").value
    let y = eval(x)
    document.getElementById("result").value = y
}

//function that clear the display
function clr() {
    document.getElementById("result").value = ""
}

//calculator script
function dis(val) {
    document.getElementById("result").value += val
}

//************************************************Calculator Script-End************************************************//

