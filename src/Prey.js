define('Prey', ['underscore'], function (_) {
    var Prey = function (score, birth) {
        this.type = 'prey';
        this.born = born || 0;
        this.score = score || 2;
    };

    Prey.prototype.reproduce = function(cell) {

    };

    Prey.prototype.die = function(cell) {

    };

    return Prey;
});

