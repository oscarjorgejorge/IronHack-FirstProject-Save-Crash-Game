'use strict';

function Obstacle (firstX, secondX, thirdX, y, gameSurface, size, hitPower) {
    var self = this;
    
    self.firstX = firstX;
    self.secondX = secondX;
    self.thirdX = thirdX;
    self.y = y;
    self.gameSurface = gameSurface;
    self.size = size;
    self.hitPower = hitPower;
    self.isAlive = true;

} 

Obstacle.prototype._getCellEnemy = function () {
    var self = this;
    
    var firstColumnEnemy = self.gameSurface.children[self.firstX];
    var secondColumnEnemy = self.gameSurface.children[self.secondX];
    var thirdColumnEnemy = self.gameSurface.children[self.thirdX];

    var firstCellEnemy = firstColumnEnemy.children[self.y];
    var secondCellEnemy = secondColumnEnemy.children[self.y];
    var thirdCellEnemy = thirdColumnEnemy.children[self.y];
    var cellsEnemies = [firstCellEnemy, secondCellEnemy, thirdCellEnemy];
    return cellsEnemies;
}

Obstacle.prototype.clear = function () {
    var self = this;
    
    var cellsEnemies = self._getCellEnemy();
    cellsEnemies.forEach(function (enemy) {
        enemy.classList.remove('obstacles-level1');
    })      
}


Obstacle.prototype._checkLife = function () {
    var self = this;
    
    if (self.y >= self.size) {
        self.isAlive = false;
    } 
}

Obstacle.prototype.move = function () {
    var self = this;
    
    self.y ++;
    self._checkLife();
}

Obstacle.prototype.draw = function () {
    var self = this;
    
    var cellsEnemies = self._getCellEnemy();
    cellsEnemies.forEach(function (enemy) {
        enemy.classList.add('obstacles-level1');
    })
}

Obstacle.prototype.hitPlayer = function() {
    var self = this;

    var damage = Math.floor(Math.random()*self.hitPower);
    console.log(damage);
    return damage;    
}

