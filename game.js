'use strict';


function Game (mainContainer) {
    var self = this;

    self.mainContainer = mainContainer;
    self.gameContainer;
    self.gameSurface;
    self.size;
    self.seconds;
    self.timeoutTime;
    self.intervalIdGame;
    self.intervalIdSeconds;
    self.handleKeyPress;
    self.onEnded;
    self.scoreInfo;
    self.lifeInfo;
    self.playerDamageReceived;
    self.enemiesInfoHitPower;

    self.enemies;
    self.enemiesLevels;
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

    self.size = 10;
    self.seconds = 120;
    self.enemies = [];
    
    document.addEventListener('keydown', self.handleKeyPress);

    self.buildLayout();
    self.start();
}

Game.prototype.start = function () {
    var self = this;
    
    self.createPlayer();
    self.drawPlayer();

    self.intervalIdSeconds = setInterval  (function (){
        self.calculateScore();
        
    }, 1000)
    
    var gameTimeControler = function () {
        self.checkTime();
        self.controlTime();
        
        self.clearEnemies();
        self.moveEnemies();
        self.checkEnemiesDead();
        self.createEnemiesControl();
        self.drawEnemies();
        self.checkCollisions();

        if (self.health > 0 && self.seconds > 0) {
            setTimeout(gameTimeControler, self.timeoutTime);
        } else {
            self.checkCollisions();
            }
        }

    window.setTimeout(gameTimeControler, self.timeoutTime);
}

Game.prototype.checkTime = function () {
    var self = this;

    if (self.seconds <= 0) {
        self.onEnded(self.seconds);
    }
}
 
Game.prototype.controlTime = function () {
    var self = this;

    if (self.seconds >=115 ) {
        self.timeoutTime = 900;
    } else if (self.seconds >= 110) {
        self.timeoutTime = 800;
    } else if (self.seconds >= 105) {
        self.timeoutTime = 700;
    } else if (self.seconds >= 100) {
        self.timeoutTime = 600;
    } else if (self.seconds >= 90) {
        self.timeoutTime = 500;
    } else if (self.seconds >= 80) {
        self.timeoutTime = 400;
    } else if (self.seconds >= 50) {
        self.timeoutTime = 300;
    } else if (self.seconds >= 15) {
        self.timeoutTime = 200;
    } else {
        self.timeoutTime = 100;
    }
}

Game.prototype.calculateScore = function () {
    var self = this;

    self.seconds --;
    self.scoreInfo.innerText = self.seconds + ' sec to save Crush';
}

Game.prototype.checkCollisions = function () {
    var self = this;
    self.enemies.forEach(function (enemy, index) {
        if(enemy.y === self.size -1) {
            if(enemy.firstX === self.player.x || enemy.secondX === self.player.x || enemy.thirdX ===self.player.x) {
                enemy.clear();
                self.enemies.splice(index, 1);
                var damage = enemy.hitPlayer();
                self.health = self.player.recieveDamage(damage);
                self.playerDamageReceived.innerText = 'Damage received: ' + damage;
                
                window.setTimeout(function (){
                    self.playerDamageReceived.innerText = 'Damage received: ';
                }, 2000);

                self.player.drawCollision();
                self.updateLifeInfo();
                self.checkIsDead();
            }
        }
    })
}


Game.prototype.destroy = function () {
    var self = this;

    clearInterval(self.intervalIdSeconds);
    document.removeEventListener('keydown', self.handleKeyPress);
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
        self.onEnded(self.seconds);
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


Game.prototype.hitPowerControl = function () {
    var self = this;
    
    if (self.seconds >= 105) {
        self.hitPower = 10;
    } else if (self.seconds >= 85) {
        self.hitPower = 20;
    } else if (self.seconds >= 50) {
        self.hitPower = 30;
    } else {
        self.hitPower = 40;  
    }
}

Game.prototype.createEnemyLevelOne = function () {
    var self = this;

    self.hitPowerControl();
    var randomX = Math.floor(Math.random()*self.size);
    var secondX = randomX;
    var thirdX = randomX;
    var fixY = 0;
    
    var newEnemy = new Obstacle (randomX, secondX, thirdX, fixY, self.gameSurface, self.size, self.hitPower);
    self.enemies.push(newEnemy);
    self.enemiesInfoHitPower.innerText = 'Enemies hit power: ' + newEnemy.hitPower;
}

Game.prototype.createEnemyLevelTwo = function () {
    var self = this;

    self.hitPowerControl();
    var randomX = Math.floor(Math.random()*(self.size -1));
    var secondX = randomX +1;
    var thirdX = secondX;
    var fixY = 0;

    var newEnemy = new Obstacle (randomX, secondX, thirdX, fixY, self.gameSurface, self.size, self.hitPower);
    self.enemies.push(newEnemy);
    self.enemiesInfoHitPower.innerText = 'Enemies hit power: ' + newEnemy.hitPower;
}

Game.prototype.createEnemyLevelThree = function () {
    var self = this;

    self.hitPowerControl();
    var randomX = Math.floor(Math.random()*(self.size -2));
    var secondX = randomX +1;
    var thirdX = randomX +2;
    var fixY = 0;

    var newEnemy = new Obstacle (randomX, secondX, thirdX, fixY, self.gameSurface, self.size, self.hitPower);
    self.enemies.push(newEnemy);
    self.enemiesInfoHitPower.innerText = 'Enemies hit power: ' + newEnemy.hitPower;
}

Game.prototype.createEnemiesControl = function () {
    var self = this;
    
    var randomLevel;
    self.enemiesLevels = [];
    

    if (self.seconds >= 105) {
        self.createEnemyLevelOne();
    } else if (self.seconds >= 75) {
        randomLevel = Math.floor(Math.random()*2);
            if (randomLevel === 0) {
                self.createEnemyLevelOne();
            } else {
                self.createEnemyLevelTwo();
            }
    } else  {
        randomLevel = Math.floor(Math.random()*3);
        if (randomLevel === 0) {
            self.createEnemyLevelOne();
        } else if (randomLevel === 1) {
            self.createEnemyLevelTwo();
        }  else {
            self.createEnemyLevelThree();            
        }
    }
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
            gameRows.style.width = '' + 500/self.size + 'px';
            gameRows.style.height = '' + 500/self.size + 'px';
            gameColumns.appendChild(gameRows);
        }      
        self.gameSurface.appendChild(gameColumns);
    }
    
    var gameInfo = document.createElement('div');
    gameInfo.classList.add('game-info');

    var informationTittle = document.createElement('h1');
    informationTittle.classList.add('tittle-info');
    informationTittle.innerText = 'Informations:';

    self.scoreInfo = document.createElement('p');
    self.scoreInfo.classList.add('score-info');
    self.scoreInfo.innerText = "120 sec to save Crush";

    self.lifeInfo = document.createElement('p');
    self.lifeInfo.classList.add('life-info');
    self.lifeInfo.innerText = 'Life: 100%';

    self.playerDamageReceived = document.createElement('p');
    self.playerDamageReceived.classList.add('damage-info');
    self.playerDamageReceived.innerText = 'Damage received ';

    self.enemiesInfoHitPower = document.createElement('p');
    self.enemiesInfoHitPower.classList.add('enemies-hit-power-info');
    self.enemiesInfoHitPower.innerText = 'Enemies hit power: 0';

    gameInfo.appendChild(informationTittle);
    gameInfo.appendChild(self.scoreInfo);
    gameInfo.appendChild(self.lifeInfo);
    gameInfo.appendChild(self.playerDamageReceived);
    gameInfo.appendChild(self.enemiesInfoHitPower);
    self.gameContainer.appendChild(gameInfo);
}

Game.prototype.onGameOver = function (callBack) {
    var self = this;

    self.onEnded = callBack; 
}