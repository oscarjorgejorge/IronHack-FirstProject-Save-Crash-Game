'use strict';

function Obstacle (x, y, gameSurface, size, hitPower) {
    var self = this;
    
    self.x = x;
    self.y = y;
    self.gameSurface = gameSurface;
    self.size = size;
    self.hitPower = hitPower;
    self.isAlive = true;

} 

Obstacle.prototype._getCellEnemy = function () {
    var self = this;
    
    var columnEnemy = self.gameSurface.children[self.x];
    // var secondColumnEnemy = self.gameSurface.children[self.secondx];

    var cellEnemy = columnEnemy.children[self.y];
    // var secondCellEnemy =secondColumnEnemy.children[self.y];

    return cellEnemy; //+ secondCellEnemy;
}

Obstacle.prototype.clear = function () {
    var self = this;
    
    var cellEnemy = self._getCellEnemy();
    cellEnemy.style.backgroundColor = 'white';
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
    
    var cellEnemy = self._getCellEnemy();
    cellEnemy.style.backgroundColor = 'red';
}

Obstacle.prototype.hitPlayer = function() {
    var self = this;

    var damage = Math.floor(Math.random()*self.hitPower);
    console.log(damage);
    return damage;    
}

