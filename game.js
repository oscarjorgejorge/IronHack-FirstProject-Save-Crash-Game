'use strict';


function Game (mainContainer) {
    var self = this;

    self.mainContainer = mainContainer;
    self.gameContainer;
    self.gameSurface;
    self.intervalTime;
    self.size;

    self.enemies;

    self.player;
    self.playerLife;

    self.init();    

}

// Game Functions 

Game.prototype.init = function () {
    var self = this;

    self.intervalTime = 500;
    self.size = 10;

    self.enemies = [];

    self.playerLife = 0;

    self.buildLayout();
    self.start();
}


Game.prototype.start = function () {
    var self = this;

    self.createPlayer();
    self.drawPlayer();


    var intervalId = setInterval (function () {
        self.clearEnemies();
        self.moveEnemies();
        self.checkEnemiesDead();
        self.createEnemy();
        self.drawEnemies();

    }, self.intervalTime)
}

// Player Functions

Game.prototype.createPlayer = function () {
    var self = this;

    var startPlayerX = self.size/2;
    var startPlayerY = self.size -1;

    self.player = new Player (startPlayerX, startPlayerY, self.gameSurface, self.size);
    self.playerLife += 100;
}

Game.prototype.drawPlayer = function () {
    var self = this;
    self.player.draw();
}




// Enemy Functions 

Game.prototype.clearEnemies = function () {
    var self = this;

    self.enemies.forEach(function (enemy) {
        enemy.clear();
    })
}

Game.prototype.moveEnemies = function () {
    var self = this;

    self.enemies.forEach(function (enemy) {
        enemy.move();
    })
}

Game.prototype.checkEnemiesDead = function () {
    var self = this;

    self.enemies.forEach(function (enemy, index) {
        if (!enemy.isAlive) {
            self.enemies.splice(index, 1)
        }
    })
}

Game.prototype.createEnemy = function () {
    var self = this;

    var randomX = Math.floor(Math.random()*self.size);
    var fixY = 0;

    var newEnemy = new Obstacle (randomX, fixY, self.gameSurface, self.size);
    self.enemies.push(newEnemy);
}

Game.prototype.drawEnemies = function () {
    var self = this;

    self.enemies.forEach(function (enemy) {
        enemy.draw();
    });
}



// Game Functions 

Game.prototype.buildLayout = function() {
    var self = this;

    self.gameContainer = document.createElement('div');
    self.gameContainer.setAttribute('id', 'game-container');
    self.mainContainer.appendChild(self.gameContainer);

    self.gameSurface = document.createElement('div');
    self.gameSurface.classList.add('game-surface');
    self.gameContainer.appendChild(self.gameSurface);

    for (var x = 0; x < self.size; x ++) {
        var gameColumns = document.createElement('div');
        gameColumns.classList.add('game-columns');

        for (var y = 0; y < self.size; y ++) {
            var gameRows = document.createElement('div');
            gameRows.classList.add('game-rows');
            // gameRows.style.width = '' + 500/self.size + '';
            // gameRows.style.height = '' + 500/self.size+ '';
            gameColumns.appendChild(gameRows);
        }      
        self.gameSurface.appendChild(gameColumns);
    }
    
    var gameInfo = document.createElement('div');
    gameInfo.innerHTML = '<h3>Game Information<h3/><p>Score : 00<p/><p>Time : 00:00<p/><p>Life : 100%<p/>';
    gameInfo.classList.add('game-info');
    self.gameContainer.appendChild(gameInfo);
}





    