define('Prey', ['underscore'], function (_) {
    var Prey = function (camouflage, born) {
        this.type = 'prey';
        this.born = born || 0;
        this.camouflage = camouflage || 0;
    };

    Prey.prototype.reproduce = function(cell) {

    };

    Prey.prototype.die = function(cell) {

    };

    return Prey;
});

