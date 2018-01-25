'use strict';

function Obstacle (x, secondx, y, gameSurface, size, hitPower) {
    var self = this;
    
    self.x = x;
    self.secondx = secondx;
    self.y = y;
    self.gameSurface = gameSurface;
    self.size = size;
    self.hitPower = hitPower;
    self.isAlive = true;

} 

Obstacle.prototype._getCellEnemy = function () {
    var self = this;
    
    var columnEnemy = self.gameSurface.children[self.x];
    var secondColumnEnemy = self.gameSurface.children[self.secondx];

    var firstCellEnemy = columnEnemy.children[self.y];
    var secondCellEnemy =secondColumnEnemy.children[self.y];
    var cellsEnemies = [firstCellEnemy, secondCellEnemy];
    return cellsEnemies;
}

Obstacle.prototype.clear = function () {
    var self = this;
    
    var cellsEnemies = self._getCellEnemy();
    cellsEnemies.forEach(function (enemy) {
        enemy.style.backgroundColor = 'white';
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
        enemy.style.backgroundColor = 'red';
    })
}

Obstacle.prototype.hitPlayer = function() {
    var self = this;

    var damage = Math.floor(Math.random()*self.hitPower);
    console.log(damage);
    return damage;    
}

