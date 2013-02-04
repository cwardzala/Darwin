define('Prey', ['underscore'], function (_) {
    var Prey = function (score, birth) {
        this.type = 'prey';
        this.birth = birth || 0;
        this.score = score || 2;
        this.id = _.uniqueId('prey_');
    };

    Prey.prototype.reproduce = function(cell) {
        var up = this.score + 1,
            down = this.score -1,
            birth = this.birth + 1;
        cell.prey.push(new Prey(up, birth));
        cell.prey.push(new Prey(down, birth));

        return this;
    };

    Prey.prototype.die = function(cell) {
        var _this = this;
        cell.prey = _.reject(cell.prey, function (item) {
            return item.id === _this.id;
        });
    };

    return Prey;
});

