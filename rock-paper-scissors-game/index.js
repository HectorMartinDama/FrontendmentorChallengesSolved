import CHOICES  from './choicces.json';
import confetti from 'canvas-confetti';
import { wavesAnimation } from './components/waves';

const winOptions= Object.freeze({ 'player':  { 'name' : 'player' , 'message' : 'YOU WIN', 'color': '#434359'}, 'house': { 'name' : 'house', 'message' : 'YOU LOSE', 'color' : '#AE2444'}, 'tie': { 'name' : 'tie', 'message' : 'TIE', 'color': '#434359'}});
const combinations= Object.freeze({ 'spock': 'spock', 'scissors': 'scissors', 'paper': 'paper', 'lizard': 'lizard', 'rock': 'rock'});

const boardScore= document.querySelector('#board-score'); 
const dialog = document.querySelector('dialog');
const btnPlayAgain= document.querySelectorAll('#btn-play-again');  
const choiceBtns= document.querySelectorAll('.circle');


choiceBtns.forEach(button => button.addEventListener('click', () =>{
   const playerChoice= getPlayer(button);
   const houseChoice= getPlayer(housePicked());

    checkWinner(playerChoice.name, houseChoice.name)
        .then(result => {
            document.querySelector('.main-screen').style.display= 'none';
            step4(playerChoice, houseChoice, result)
            .then(saveScore(result, getScore()));
    });
}))

btnPlayAgain.forEach(btn => btn.addEventListener('click', () =>{
    resetGame();
}));

function getPlayer(button){
    switch(button.id || button){
        case 'spock': return CHOICES.spock;
        case 'scissors': return CHOICES.scissors;
        case 'paper': return CHOICES.paper;
        case 'lizard': return CHOICES.lizard;
        case 'rock': return CHOICES.rock;
    }
}

async function checkWinner(playerChoice, houseChoice){
    if(playerChoice === combinations.scissors && houseChoice === combinations.paper) return winOptions.player;

    if(houseChoice === combinations.scissors && playerChoice === combinations.paper) return winOptions.house;

    if(playerChoice === combinations.paper && houseChoice === combinations.rock) return winOptions.player;
    if(houseChoice === combinations.paper && playerChoice === combinations.rock) return winOptions.house;

    if(playerChoice === combinations.rock && houseChoice === combinations.lizard) return winOptions.player;
    if(houseChoice === combinations.rock && playerChoice === combinations.lizard) return winOptions.house;

    if(playerChoice === combinations.lizard && houseChoice === combinations.spock) return winOptions.player;
    if(houseChoice === combinations.lizard && playerChoice === combinations.spock) return winOptions.house;

    if(playerChoice === combinations.spock && houseChoice === combinations.scissors) return winOptions.player;
    if(houseChoice === combinations.spock && playerChoice === combinations.scissors) return winOptions.house;

    if(playerChoice === combinations.scissors && houseChoice === combinations.lizard) return winOptions.player;
    if(houseChoice === combinations.scissors && playerChoice === combinations.lizard) return winOptions.house;

    if(playerChoice === combinations.paper && houseChoice === combinations.spock) return winOptions.player;
    if(houseChoice === combinations.paper && playerChoice === combinations.spock) return winOptions.house;

    if(playerChoice === combinations.rock && houseChoice === combinations.scissors) return winOptions.player;
    if(houseChoice === combinations.rock && playerChoice === combinations.scissors) return winOptions.house;

    if(playerChoice === combinations.lizard && houseChoice === combinations.paper) return winOptions.player;
    if(houseChoice === combinations.lizard && playerChoice === combinations.paper) return winOptions.house;
    
    if(playerChoice === combinations.spock && houseChoice === combinations.rock) return winOptions.player;
    if(houseChoice === combinations.spock && playerChoice === combinations.rock) return winOptions.house;
    return winOptions.tie;
}

export function getScore(){
    if(localStorage.getItem('score') === null) localStorage.setItem('score', 0)
    return parseInt(localStorage.getItem('score'));
}

function saveScore(winPlayer, record){
    const lastScore= getScore();
    if(winPlayer == winOptions.player){
        localStorage.setItem('score', record + 1);
    }else if(winPlayer == winOptions.house && record > 0){
        localStorage.setItem('score', record - 1);
    }
    if(getScore() > lastScore) confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });            
    boardScore.textContent= getScore();
}

function housePicked(){
    const choices= Object.keys(CHOICES);
    const randomIndex= Math.floor(Math.random()*choices.length);
    return choices[randomIndex];
}

async function step4(playerChoice, houseChoice, result){
    document.querySelector('.finalGame').style.removeProperty('display');
    btnPlayAgain.forEach(btn => btn.style.color= result.color);
    document.querySelector('.message-result').textContent= result.message;
    document.querySelector('#board-again-mobile .message-result').textContent= result.message;
    document.querySelector('.step3:nth-child(1) button').id= playerChoice.name;
    document.querySelector('.step3:nth-child(1) img').src= playerChoice.image;
    document.querySelector('.step3:nth-child(3) button').id= houseChoice.name;
    document.querySelector('.step3:nth-child(3) img').src= houseChoice.image;
    waves(result);
}

function resetGame(){
    const finalGame= document.querySelector('.finalGame');
    if(finalGame){
        document.querySelectorAll('.circleWaves').forEach(element => element.remove()); 
        finalGame.style.display= 'none';
        document.querySelector('.main-screen').style.display= 'block';
        confetti.reset();
    }    
}


function waves(result){
    if(result.name === winOptions.player.name) document.querySelector('#player').innerHTML += wavesAnimation();
    else if (result.name === winOptions.house.name) document.querySelector('#house').innerHTML += wavesAnimation();
}




window.addEventListener('load', function() {
    counterAnimation();
    boardScore.textContent= getScore();
});


// -------------- Modal -----------------------
function onClick(event) {
    if (event.target === dialog) {
        dialog.close();
    }
}

dialog.addEventListener('click', onClick); // close the dialog when clicking outside of it
// ---------------------------------------------

// counter animation
function counterAnimation(){
    let endValue= getScore();
    if(endValue != 0){
        let startValue= 0;
        let duration= Math.floor(2000/ endValue);
        let counter= setInterval(function(){
            startValue++;
            boardScore.textContent= startValue;
            if(startValue == endValue) clearInterval(counter);
        }, duration)
    }
}