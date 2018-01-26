'use strict';

function main (){

    var mainContainer = document.getElementById('main-container');    
    var stage;

    // -- SPLASH

    var splashContainer;
    var startGameButton;
    var audio = new Audio('./img/music.mp3');

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
        tittle.classList.add('splash-title');
        tittle.innerText = "Save Crush";
        splashContainer.appendChild(tittle);

        var img = document.createElement('img');
        img.classList.add('img-splash')
        img.setAttribute('src', './img/tortoise.png');
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

        audio.play();

        game = new Game(mainContainer);
        game.onGameOver(function (seconds){
            destroyGame();
            buildGameOver(seconds);
        });
    }

    function destroyGame() {
        game.destroy();
    }


    // -- GAME OVER
    var gameOverContainer;
    var playAgainButton; 

    var handlePlayAgainClick = function () {
        destroyGameOver();
        buildSplash();
    }

    function buildGameOver(seconds) {
        stage = 'gameover';

        audio.pause();
        gameOverContainer = document.createElement('div');
        gameOverContainer.setAttribute('id', 'game-over-container');
        mainContainer.appendChild(gameOverContainer);

        var gameOverTittle = document.createElement('h1');
        gameOverTittle.innerText = 'GAME OVER';
        gameOverTittle.classList.add('game-over-tittle');
        gameOverContainer.appendChild(gameOverTittle);

        var survivalTime = 120 - seconds;
        var gameOverInfo = document.createElement('div');
        gameOverInfo.classList.add('game-over-info');
        if (survivalTime === 0) {
            gameOverInfo.innerHTML = 'Crush survived!!!!!, he is so happy!!!!!.   REMEMBER: Don\´t throw trash in the ocean.';
        } else {
            gameOverInfo.innerHTML = 'Crush survived ' + survivalTime + ' seconds, but it was not enough. Fortunately he has 3 second memory, so you can try again  :) And REMEMBER: Don\´t throw trash in the ocean.';
        }
        gameOverContainer.appendChild(gameOverInfo);

        var happyImgGameOver = document.createElement('img');
        happyImgGameOver.classList.add('happy-img-gameover');
        happyImgGameOver.setAttribute('src', './img/happy-tortoise.gif');
        gameOverContainer.appendChild(happyImgGameOver);

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
