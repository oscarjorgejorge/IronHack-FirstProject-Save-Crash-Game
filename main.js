'use strict';

function main (){

    var mainContainer = document.getElementById('main-container');    
    var stage;

    // -- SPLASH

    var splashContainer;
    var startGameButton;

    var handlePlayButton = function () {
        destroySplash();
        buildGame();
    }

    function buildSplash () {
        stage = 'splash';

        splashContainer = document.createElement('div');
        splashContainer.setAttribute('id', 'splash-container');
        mainContainer.appendChild(splashContainer);

        var tittle = document.createElement('h1');
        tittle.innerText = "I am a happy h1";
        splashContainer.appendChild(tittle);

        var img = document.createElement('img');
        img.classList.add('img-splash')
        img.setAttribute('src', './img/28519087.jpg');
        img.setAttribute('alt', 'meme');
        splashContainer.appendChild(img);

        startGameButton = document.createElement('button');
        startGameButton.innerText = 'Play';
        startGameButton.classList.add('start-button');
        splashContainer.appendChild(startGameButton);
        startGameButton.addEventListener('click', handlePlayButton);
    }
    
    
    function destroySplash() {
        splashContainer.remove();
        startGameButton.removeEventListener('click', handlePlayButton);
    }
    
    // -- GAME  
    var game;

    function buildGame() {
        stage = 'game';

        game = new Game(mainContainer);
        
    }

    function destroyGame() {
        gameContainer.remove();

    }

    // -- GAME OVER
    var gameOverContainer;
    var playAgainButton; 

    var handlePlayAgainClick = function () {
        destroyGameOver();
        buildSplash();
    }

    function buildGameOver() {
        stage = 'gameover';
        gameOverContainer = document.createElement('div');
        gameOverContainer.setAttribute('id', 'game-over-container');
        mainContainer.appendChild(gameOverContainer);

        var gameOverTittle = document.createElement('h1');
        gameOverTittle.innerText = 'GAME OVER';
        gameOverTittle.classList.add('game-over-tittle');
        gameOverContainer.appendChild(gameOverTittle);

        var gameOverInfo = document.createElement('div');
        gameOverInfo.classList.add('game-over-info');
        gameOverInfo.innerHTML = '<p>Score : 1500<p/><p>Ranking :<p/><p>Player 1 : 50000 points<p/><p>Player 2 : 44000 points<p/><p>Player 3 : 40000 points<p/>';
        gameOverContainer.appendChild(gameOverInfo);

        playAgainButton = document.createElement('button');
        playAgainButton.classList.add('play-again-button');
        playAgainButton.innerText = 'Play Again';
        gameOverContainer.appendChild(playAgainButton);
        playAgainButton.addEventListener('click', handlePlayAgainClick)

    }

    function destroyGameOver() {
        gameOverContainer.remove();
        playAgainButton.removeEventListener('click', handlePlayAgainClick);
    }
    
    buildSplash();
}

window.onload = main;
