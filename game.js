'use strict';


function Game (mainContainer) {
    var self = this;

    self.mainContainer = mainContainer;
    self.gameContainer;
    self.gameSurface;
    self.size;
    self.score;
    self.timeoutTime;
    self.intervalIdGame;
    self.intervalIdScore;
    self.handleKeyPress;
    self.onEnded;
    self.scoreInfo;
    self.lifeInfo;
    self.enemiesInfo;

    self.enemies;
    self.hitPower;

    self.player;
    self.health;

    self.handleKeyPress = function (event) {
        self.clearPlayer();

        if (event.keyCode === 37) {
            self.movePlayer('left');
        } else if (event.keyCode === 39) {
            self.movePlayer('right');
        }
        self.drawPlayer();
        self.checkCollisions();
    }

    self.init();
}

// Game Functions 
Game.prototype.init = function () {
    var self = this;

    self.size = 8;
    self.score = 0;
    self.enemies = [];
    
    document.addEventListener('keydown', self.handleKeyPress);

    self.buildLayout();
    self.start();
}

Game.prototype.start = function () {
    var self = this;
    
    self.createPlayer();
    self.drawPlayer();

    self.intervalIdScore = setInterval  (function (){
        self.calculateScore();
        // self.controlTime();
        
    }, 1000)
    
    var gameTimeControler = function () {
        if (self.score <= 10) {
            self.timeoutTime = 1000;
        } else if (self.score > 10 && self.score < 20) {
            self.timeoutTime = 900;
        } else if (self.score >= 20 && self.score < 30) {
            self.timeoutTime = 800;
        } else if (self.score >= 30 && self.score < 40) {
            self.timeoutTime = 700;
        } else if (self.score >= 40 && self.score < 50) {
            self.timeoutTime = 600;
        } else if (self.score >= 50 && self.score < 60) {
            self.timeoutTime = 500;
        } else if (self.score >= 60 && self.score < 70) {
            self.timeoutTime = 400;
        } else if (self.score >= 70 && self.score < 80) {
            self.timeoutTime = 300;
        } else if (self.score >= 80 && self.score <=90) {
            self.timeoutTime = 200;
        } else {
            self.timeoutTime = 100;
        }

        self.clearEnemies();
        self.moveEnemies();
        self.checkEnemiesDead();
        self.createEnemy();
        self.drawEnemies();
        self.checkCollisions();

        console.log(self.timeoutTime);
            if (self.health > 0) {
                setTimeout(gameTimeControler, self.timeoutTime);
            }
        }

    window.setTimeout(gameTimeControler, self.timeoutTime);

    // self.intervalIdGame = setInterval (function () {
    //     self.clearEnemies();
    //     self.moveEnemies();
    //     self.checkEnemiesDead();
    //     self.createEnemy();
    //     self.drawEnemies();
    //     self.checkCollisions();
        
    // }, self.intervalTime)
}

// Game.prototype.controlTime = function () {
//     var self = this;

//     if (self.score <= 10) {
//         self.intervalTime = 1000;
//     } else if (self.score > 10 && self.score < 20) {
//         self.intervalTime = 900;
//     } else if (self.score >= 20 && self.score < 30) {
//         self.intervalTime = 800;
//     } else if (self.score >= 30 && self.score < 40) {
//         self.intervalTime = 700;
//     } else if (self.score >= 40 && self.score < 50) {
//         self.intervalTime = 600;
//     } else if (self.score >= 50 && self.score <= 60) {
//         self.intervalTime = 500;
//     } else {
//         self.intervalTime = 400;
//     }
//     console.log(self.intervalTime);
// }

Game.prototype.calculateScore = function () {
    var self = this;

    self.score ++;
    self.scoreInfo.innerText = 'Score: ' + self.score + ' points';
}

Game.prototype.checkCollisions = function () {
    var self = this;
    self.enemies.forEach(function (enemy, index) {
        if(enemy.y === self.size -1) {
            if(enemy.x === self.player.x) {
                enemy.clear();
                self.enemies.splice(index, 1);
                self.health = self.player.recieveDamage(enemy.hitPlayer());
                self.player.drawCollision();
                self.updateLifeInfo();
                self.checkIsDead();
                
                window.setTimeout(function() {
                    self.player.draw();
                }, 300);
            }
        }
    })
}


Game.prototype.destroy = function () {
    var self = this;

    clearInterval(self.intervalIdScore)
    // clearInterval(self.intervalIdGame);
    self.gameContainer.remove();
}

// Player Functions    
Game.prototype.createPlayer = function () {
    var self = this;
    
    self.health = 100;
    var startPlayerX = Math.floor(self.size/2);
    var startPlayerY = self.size -1;
    
    self.player = new Player (startPlayerX, startPlayerY, self.gameSurface, self.size, self.health);
}

Game.prototype.clearPlayer = function () {
    var self = this;
    
    self.player.clear();
}

Game.prototype.drawPlayer = function () {
    var self = this;
    self.player.draw();
}

Game.prototype.movePlayer = function (direction) {
    var self = this;
    
    self.player.update(direction);
}

Game.prototype.updateLifeInfo = function () {
    var self = this;
    
    self.lifeInfo.innerText = 'Life: ' + self.health + '%';
}

Game.prototype.checkIsDead = function() {
    var self = this;
    
    if (self.health < 0) {
        self.onEnded(self.score);
    }
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


    if (self.score < 5) {
        self.hitPower = 5;
    } else if (self.score >= 5 && self.score < 10) {
        self.hitPower = 10;
    } else if (self.score >= 10 && self.score < 20) {
        self.hitPower = 20;
    } else if (self.score >= 20 && self.score < 30) {
        self.hitPower = 30;  
    } else if (self.score >= 30) {
        self.hitPower = 40;
    } else {
        self.hitPower = 50;
    }

    var newEnemy = new Obstacle (randomX, fixY, self.gameSurface, self.size, self.hitPower);
    self.enemies.push(newEnemy);
    self.enemiesInfo.innerText = 'Enemies with hit power: ' + newEnemy.hitPower;
}

// Game.prototype.createEnemyLevelOne = function () {
//     var self = this;

//     var randomX = Math.floor(Math.random()*self.size);
//     var secondX = randomX +1;
//     var fixY = 0;
//     self.damage = 40;

//     var newEnemy = new Obstacle (randomX, secondX, fixY, self.gameSurface, self.size, self.damage);
//     self.enemies.push(newEnemy);
// }

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
            gameRows.style.width = '' + 500/self.size + 'px';
            gameRows.style.height = '' + 500/self.size + 'px';
            gameColumns.appendChild(gameRows);
        }      
        self.gameSurface.appendChild(gameColumns);
    }
    
    var gameInfo = document.createElement('div');
    gameInfo.classList.add('game-info');

    var informationTittle = document.createElement('h1');
    informationTittle.innerText = 'Informations:';

    self.enemiesInfo = document.createElement('p');
    self.enemiesInfo.innerText = 'Enemies with hit power: 0';

    self.scoreInfo = document.createElement('p');
    self.scoreInfo.innerText = "0 points";


    self.lifeInfo = document.createElement('p');
    self.lifeInfo.innerText = 'Life: 100%';

    gameInfo.appendChild(informationTittle);
    gameInfo.appendChild(self.enemiesInfo);
    gameInfo.appendChild(self.scoreInfo);
    gameInfo.appendChild(self.lifeInfo);
    self.gameContainer.appendChild(gameInfo);
}

Game.prototype.onGameOver = function (callBack) {
    var self = this;

    self.onEnded = callBack; 
}