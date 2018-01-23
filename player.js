'use strict';

function Player (x, y, gameSurface, size) {
    var self = this;

    self.x = x;
    self.y = y;
    self.gameSurface = gameSurface;
    self.size = size;
};


Player.prototype._getCellPlayer = function () {
    var self = this;

    var columnPlayer = self.gameSurface.children[self.x];
    var cellPlayer = columnPlayer.children[self.y];

    return cellPlayer;
}

Player.prototype.draw = function () {
    var self = this;

    var cellPlayer = self._getCellPlayer();
    cellPlayer.style.backgroundColor = 'blue';
}

Player.prototype.move = function () {
    var self = this;

    var cellPlayer = _getCellPlayer();
    cellPlayer.addEventLister('key', function (key) {
        if (key === 'flecha izquierda') {
            if (self.y > 0) {
                self.y --;
            }
        } else if (key === 'fecha derecha') {
            if (self.y < self.size) {
                self.y ++;
            }
        }
    })
}
