define('Preditor', ['underscore'], function (_) {
    var Preditor = function (score, birth) {
        this.type = "preditor";
        this.birth = birth || 0;
        this.score = score || 2;
    };

    Preditor.prototype.reproduce = function(cell) {

    };

    Preditor.prototype.die = function(cell) {

    };

    return Preditor;
});

