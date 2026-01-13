'use strict';

// 2.2. Définition de constantes
let MESSAGES = {
    'message1': 'Bienvenue sur notre jeu.',
    'message2': ' vous avez gagné !'
};

// 3.1. Définition de constantes
const PLAYER1 = "✔";
const PLAYER2 = "✗";

// Variable pour stocker la date de début de partie
let startTime;

// 2.3. Première fonction
function main() {
    // Affiche message1
    console.log(MESSAGES.message1);
    alert(MESSAGES.message1);

    // 3.2. Gestion des évènements - Cases
    for (let i = 0; i < 9; i++) {
        let cell = document.getElementById('cell' + i);
        cell.addEventListener('click', fill);
    }

    // 4.2. Gestion de l’évènement - Bouton Vérifier
    let playButton = document.getElementById('play');
    playButton.addEventListener('click', verify);

    // 6. Gestion du timer
    startTime = new Date();
    setInterval(updateTimer, 1000);
}

// 3.3. Fonction de traitement
function fill(event) {
    console.log(event.target);
    let cell = event.target;
    // Si la case est vide ou contient PLAYER2
    if (cell.innerHTML === "" || cell.innerHTML === PLAYER2) {
        cell.innerHTML = PLAYER1;
        cell.style.color = "green"; // Vert pour coches
    } else {
        cell.innerHTML = PLAYER2;
        cell.style.color = "red"; // Rouge pour croix
    }
}

// 4.1. Vérification du plateau de jeu
function verifyPlayer(playerMark) {
    // Fonction helper pour récupérer le contenu d'une case
    function getCell(i) {
        return document.getElementById('cell' + i).innerHTML;
    }

    // Lignes
    if (getCell(0) === playerMark && getCell(1) === playerMark && getCell(2) === playerMark) return true;
    if (getCell(3) === playerMark && getCell(4) === playerMark && getCell(5) === playerMark) return true;
    if (getCell(6) === playerMark && getCell(7) === playerMark && getCell(8) === playerMark) return true;

    // Colonnes
    if (getCell(0) === playerMark && getCell(3) === playerMark && getCell(6) === playerMark) return true;
    if (getCell(1) === playerMark && getCell(4) === playerMark && getCell(7) === playerMark) return true;
    if (getCell(2) === playerMark && getCell(5) === playerMark && getCell(8) === playerMark) return true;

    // Diagonales
    if (getCell(0) === playerMark && getCell(4) === playerMark && getCell(8) === playerMark) return true;
    if (getCell(2) === playerMark && getCell(4) === playerMark && getCell(6) === playerMark) return true;

    return false;
}

// 4.2. Fonction appelée par le bouton Vérifier
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

// Fonction utilitaire pour réinitialiser le jeu (bonus demandé: "réinitialiser chaque case")
function resetGame() {
    for (let i = 0; i < 9; i++) {
        let cell = document.getElementById('cell' + i);
        cell.innerHTML = "";
        cell.style.color = "";
    }
    // On peut aussi redémarrer le timer? Le sujet ne le demande pas explicitement à ce stade mais c'est logique.
    // "Dans le cas où un joueur est gagnant, il serait intéressant de réinitialiser chaque case du plateau de jeu"
    // On laisse le timer tourner ou on reset ? "pour la session en cours", le timer semble être pour la partie.
    startTime = new Date();
}

// 5. Gestion des scores
function addScore(name) {
    let table = document.getElementById('scores');
    let row = table.insertRow(); // Insère une ligne à la fin du tableau
    // Note: thead is usually index 0 rows if present in table.rows but insertRow adds to tbody by default if exists or to table.
    // Let's assume standard behavior. 'scores' table has a thead. We want to append to body.
    // If we use table.insertRow(), it appends to the last tbody.

    let cellName = row.insertCell(0);
    let cellDate = row.insertCell(1);

    cellName.innerHTML = name;
    cellDate.innerHTML = new Date().toLocaleString();
}

// 6. Gestion du timer
function updateTimer() {
    let now = new Date();
    // Temps écoulé en secondes
    let diff = Math.floor((now - startTime) / 1000);

    let minutes = Math.floor(diff / 60);
    let seconds = diff % 60;

    // Formatage avec 0 si besoin
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    let timerSpan = document.getElementById('timer');
    timerSpan.innerHTML = minutes + ":" + seconds;
}

// Appel de main
main();
