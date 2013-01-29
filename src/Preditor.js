define('Preditor', ['underscore'], function (_) {
    var Preditor = function (visualAcuity, born) {
        this.type = "preditor";
        this.born = born || 0;
        this.visualAcuity = visualAcuity || 0;
    };

    Preditor.prototype.reproduce = function(cell) {

    };

    Preditor.prototype.die = function(cell) {

    };

    return Preditor;
});

