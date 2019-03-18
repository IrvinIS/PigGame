/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying; //declare variables

init();

// document.querySelector('#current-' + activePlayer).textContent = dice; // выбираем id из html для и присваиваем ему генератор 'dice'
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'      //таким образом можно добавить теги в htmlч



document.querySelector('.btn-roll').addEventListener('click', function() { //create a function which creates the game mechanics
if (gamePlaying) {
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1; //create a generator of random numbers from 1 to 6

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; // each click would display a picture with dice with numbers equal the result of random numbers generator


    //3. Update the round score IF the rolled number is not a 1;
    if (dice !== 1) {
        //addscore
        roundScore += dice; // summarize points if numbers on the dice greater than 1
        document.querySelector('#current-' + activePlayer).textContent = roundScore; // summarize points
    } else {
        //next player
        nextPlayer();// call a function which switches players in case the numbers on the dice is == 1
    }
        // document.querySelector('.player-0-panel').classList.remove('active'); // удаление класса
        // document.querySelector('.player-1-panel').classList.add('active'); // добавление класса

    }
});


document.querySelector('.btn-hold').addEventListener('click', function() { //create a function of winning conditionals
    
    if (gamePlaying) {
    //Add current score to the global score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Check if the player won the game
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('.active');
        gamePlaying = false;
    } else {
        //next player
        nextPlayer();
    }
}
});




function nextPlayer () { 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // changing players
        roundScore = 0;

        document.getElementById('current-0').textContent = '0'; // setting up the value at the beginning of the turn
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active'); // toggle active between the players
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none'; // hide the dice during toggling
}

document.querySelector('.btn-new').addEventListener('click', init); // create a function which works when players clicks the button "New game"

function init () {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; //change CSS: .dice - selected class, style - task type, display:none - action

    document.getElementById('score-0').textContent = '0';       //Задаём текстовое значение нужному э
    document.getElementById('score-1').textContent = '0';       //Задаём текстовое значение нужному э
    document.getElementById('current-0').textContent = '0';     //Задаём текстовое значение нужному э
    document.getElementById('current-1').textContent = '0';     //Задаём текстовое значение нужному э
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); //  на 30й строке удаляем, а тут добавляем класс, если не удалить, элемент получит 2 класса active
}