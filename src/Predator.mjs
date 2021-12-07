import { uniqueId } from '../utils.mjs';
var Predator = function (score, birth) {
    this.type = 'predator';
    this.birth = birth || 0;
    this.score = score || 2;
    this.id = uniqueId('predator_');
};

Predator.prototype.reproduce = function (cell) {
    var up = this.score + 1,
        down = this.score - 1,
        birth = this.birth + 1;
    cell.predators.push(new Predator(up, birth));
    cell.predators.push(new Predator(down, birth));

    return this;
};

Predator.prototype.eat = function (prey, cell) {
    prey.die(cell);
    this.reproduce(cell);
    this.die(cell);

    return this;
};

Predator.prototype.die = function (cell) {
    var _this = this;
    cell.predators = cell.predators.filter(function (item) {
        return item.id !== _this.id;
    });
};

export default Predator;
