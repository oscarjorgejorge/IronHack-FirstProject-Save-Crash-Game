'use strict';

function Player (x, y, gameSurface, size) {
    var self = this;

    self.x = x;
    self.y = y;
    self.gameSurface = gameSurface;
    self.size = size;
    self.life = 100;

};

Player.prototype.update = function(direction) {
    var self = this;

    if (direction === 'left') {
        if (self.x > 0) {
            self.x --;
        }
    } else if (direction === 'right') {
        if (self.x < self.size) {
                self.x ++;
            }
    }
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
    cellPlayer.style.backgroundColor = 'white';
}

Player.prototype.draw = function () {
    var self = this;

    var cellPlayer = self._getCellPlayer();
    cellPlayer.style.backgroundColor = 'blue';
}
