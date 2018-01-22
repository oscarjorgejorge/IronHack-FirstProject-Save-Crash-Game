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

    var gameContainer;

    function buildGame() {
        stage = 'game';

        gameContainer = document.createElement('div');
        gameContainer.setAttribute('id', 'game-container');
        mainContainer.appendChild(gameContainer);

        var gameBlocks;
        for (var x = 0; x <= 9; x ++) {
            gameBlocks = document.createElement('div');
            gameBlocks.classList.add('game-columns');
            gameContainer.appendChild(gameBlocks);
            var gameRows;
            for (var y = 0; y <= 9; y ++) {
                gameRows = document.createElement('div');
                gameRows.classList.add('game-rows');
                gameBlocks.appendChild(gameRows);
            }
        }
       
        var columns = document.getElementsByClassName('game-columns');
        var rows;
        for (var w = 0; w < columns.length ; w++) {
             rows = columns[w].childNodes();
        }

        var xAxis;
        var yAxis;

        
        
        // function putColor (x, y) {
        //     columns[x].rows[y].style.backgroundColor = "blue";
        // }
        
        // putColor(4,4);





        var obstacle = document.getElementsByClassName('game-rows');
        obstacle[33].style.backgroundColor = "red";
        
        var gameInfo = document.createElement('div');
        gameInfo.innerHTML = '<h3>Game Information<h3/><p>Score : 00..<p/><p>Time : 00:00<p/><p>Life : 100%<p/>';
        gameInfo.classList.add('game-info');
        gameContainer.appendChild(gameInfo);
        
        // window.setTimeout(function() {
        //     destroyGame();
        //     buildGameOver();
        // }, 2000);
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
