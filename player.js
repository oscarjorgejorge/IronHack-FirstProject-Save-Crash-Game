'use strict';

function Player (x, y, gameSurface, size, health) {
    var self = this;

    self.x = x;
    self.y = y;
    self.gameSurface = gameSurface;
    self.size = size;
    self.health = health;
};

Player.prototype.update = function(direction) {
    var self = this;

    if (direction === 'left') {
        if (self.x > 0) {
            self.x --;
        }
    } else if (direction === 'right') {
        if (self.x < self.size -1) {
                self.x ++;
            }
    }
}

Player.prototype.recieveDamage = function (damage) {
    var self = this;
    
    return self.health -= damage;
}

Player.prototype._getCellPlayer = function () {
    var self = this;

    var columnPlayer = self.gameSurface.children[self.x];
    var cellPlayer = columnPlayer.children[self.y];

    return cellPlayer;
}

Player.prototype.clear = function () {
    var self = this;

    var cellPlayer = self._getCellPlayer();
    cellPlayer.classList.remove('player-photo');
}

Player.prototype.draw = function () {
    var self = this;

    var cellPlayer = self._getCellPlayer();
    cellPlayer.classList.add('player-photo');
}


Player.prototype.drawCollision = function () {
    var self = this;

    var cellPlayer = self._getCellPlayer();
    var imgDizzy = document.createElement('img');
    imgDizzy.setAttribute('src', './img/dizzy-stars.png');
    imgDizzy.style.width = '50px';
    cellPlayer.classList.add('dizzy-player-photo')
    cellPlayer.appendChild(imgDizzy);

    window.setTimeout(function (){
        imgDizzy.remove();
    },400);
}
