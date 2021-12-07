import { uniqueId } from '../utils.mjs';

class Prey {
    type = 'prey';
    constructor(score, birth) {
        this.birth = birth || 0;
        this.score = score || 2;
        this.id = uniqueId('prey_');
    }
    reproduce = (cell) => {
        var up = this.score + 1,
            down = this.score - 1,
            birth = this.birth + 1;
        cell.prey.push(new Prey(up, birth));
        cell.prey.push(new Prey(down, birth));

        return this;
    };
    die = (cell) => {
        var _this = this;
        cell.prey = cell.prey.filter(function (item) {
            return item.id !== _this.id;
        });
    };
}
export default Prey;
