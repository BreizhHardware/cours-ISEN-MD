'use strict';

let MESSAGES = {
    'message1': 'Bienvenue sur notre jeu.',
    'message2': ' vous avez gagné !'
};

const PLAYER1 = "✔";
const PLAYER2 = "✗";

let startTime;

function main() {
    console.log(MESSAGES.message1);
    alert(MESSAGES.message1);

    for (let i = 0; i < 9; i++) {
        let cell = document.getElementById('cell' + i);
        cell.addEventListener('click', fill);
    }

    let playButton = document.getElementById('play');
    playButton.addEventListener('click', verify);

    startTime = new Date();
    setInterval(updateTimer, 1000);
}

function fill(event) {
    console.log(event.target);
    let cell = event.target;

    if (cell.innerHTML === "" || cell.innerHTML === PLAYER2) {
        cell.innerHTML = PLAYER1;
        cell.style.color = "green";
    } else {
        cell.innerHTML = PLAYER2;
        cell.style.color = "red";
    }
}

function verifyPlayer(playerMark) {
    function getCell(i) {
        return document.getElementById('cell' + i).innerHTML;
    }

    if (getCell(0) === playerMark && getCell(1) === playerMark && getCell(2) === playerMark) return true;
    if (getCell(3) === playerMark && getCell(4) === playerMark && getCell(5) === playerMark) return true;
    if (getCell(6) === playerMark && getCell(7) === playerMark && getCell(8) === playerMark) return true;

    if (getCell(0) === playerMark && getCell(3) === playerMark && getCell(6) === playerMark) return true;
    if (getCell(1) === playerMark && getCell(4) === playerMark && getCell(7) === playerMark) return true;
    if (getCell(2) === playerMark && getCell(5) === playerMark && getCell(8) === playerMark) return true;

    if (getCell(0) === playerMark && getCell(4) === playerMark && getCell(8) === playerMark) return true;
    if (getCell(2) === playerMark && getCell(4) === playerMark && getCell(6) === playerMark) return true;

    return false;
}

function verify() {
    let player1Name = document.querySelector("input[name='player1']").value;
    let player2Name = document.querySelector("input[name='player2']").value;

    if (verifyPlayer(PLAYER1)) {
        alert("Bravo " + player1Name + MESSAGES.message2);
        addScore(player1Name);
        resetGame();
    } else if (verifyPlayer(PLAYER2)) {
        alert("Bravo " + player2Name + MESSAGES.message2);
        addScore(player2Name);
        resetGame();
    }
}

function resetGame() {
    for (let i = 0; i < 9; i++) {
        let cell = document.getElementById('cell' + i);
        cell.innerHTML = "";
        cell.style.color = "";
    }

    startTime = new Date();
}

function addScore(name) {
    let table = document.getElementById('scores');
    let row = table.insertRow();

    let cellName = row.insertCell(0);
    let cellDate = row.insertCell(1);

    cellName.innerHTML = name;
    cellDate.innerHTML = new Date().toLocaleString();
}

function updateTimer() {
    let now = new Date();

    let diff = Math.floor((now - startTime) / 1000);

    let minutes = Math.floor(diff / 60);
    let seconds = diff % 60;


    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    let timerSpan = document.getElementById('timer');
    timerSpan.innerHTML = minutes + ":" + seconds;
}

main();
