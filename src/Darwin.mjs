import Prey from './Prey.mjs';
import Predator from './Predator.mjs';
import { getRandomInt, getHighest, getLowest, coinFlip } from '../utils.mjs';

class Darwin {
    board = [];
    cycle = 0;
    data = {
        predators: [],
        prey: []
    };
    pool = {
        predators: [],
        prey: []
    };
    constructor(options) {
        this.options = {
            rows: 5,
            columns: 5,
            predators: 16,
            prey: 16,
            minScore: 2,
            maxScore: 8,
            ...options
        };
        this.setup();
    }

    eachRow = (callback) => {
        var _this = this;
        for (var ri = 0; ri < this.options.rows; ri++) {
            var row = _this.board[ri];
            callback(row, ri);
        }
    };
    eachCell = (callback) => {
        var _this = this;
        _this.eachRow(function (row, ri) {
            for (var ci = 0; ci < _this.options.columns; ci++) {
                var cell = row[ci];
                callback(cell, ci, row, ri);
            }
        });
    };
    add = (type) => {
        if (!this.options[type] && !this.pool[type].length) {
            return;
        }
        var pool = this.pool[type] && this.pool[type].length ? this.pool[type].length : this.options[type];

        for (var pi = 0; pi < this.options[type]; pi++) {
            var item;

            var row = getRandomInt(this.options.rows - 1);
            var col = getRandomInt(this.options.columns - 1);
            var score = getRandomInt(this.options.minScore, this.options.maxScore);

            if (this.pool[type].length) {
                item = this.pool[type][pi];
            } else if (this.cycle == 0) {
                if (type == 'predators') {
                    item = new Predator(score);
                } else {
                    item = new Prey(score);
                }
            }
            this.board[row][col][type].push(item);
        }
    };
    parse = () => {
        var _this = this,
            predators,
            prey,
            highestPredator,
            lowestPredator,
            highestPrey,
            lowestPrey;

        _this.eachCell(function (cell, ci, row, ri) {
            predators = cell.predators;
            prey = cell.prey;
            highestPredator = predators.length ? predators.reduce(getHighest) : null;
            lowestPredator = predators.length ? predators.reduce(getLowest) : null;
            highestPrey = prey.length ? prey.reduce(getHighest) : null;
            lowestPrey = prey.length ? prey.reduce(getLowest) : null;

            console.log('Cell ' + [ri, ci].join(':'));
            console.log([cell.predators.length, cell.prey.length]);

            if (predators.length && prey.length) {
                prey.forEach(function (item) {
                    highestPredator = predators.reduce(getHighest);
                    if (highestPredator.score > item.score) {
                        highestPredator.eat(item, cell);
                        console.log('eaten');
                        console.log([cell.predators.length, cell.prey.length]);
                    } else if (highestPredator.score == item.score) {
                        var flip = coinFlip();
                        console.log('coin flip: ' + flip);
                        if (flip == 1) {
                            console.log('eaten');
                            highestPredator.eat(item, cell);
                        }
                        console.log([cell.predators.length, cell.prey.length]);
                    }
                });
            }

            if (prey.length === 1 && predators.length === 0) {
                console.log('prey reproduce');
                prey[0].reproduce(cell);
                prey[0].die(cell);

                console.log([cell.predators.length, cell.prey.length]);
            }

            if (predators.length > 0) {
                predators.forEach(function (item, i) {
                    if (item.birth == _this.cycle - 2) {
                        console.log('starve');
                        item.die(cell);
                    }
                });
            }

            console.log('--');
        });
    };
    cleanup = () => {
        var _this = this;
        //this.pool = { predators: [], prey: [] };
        this.eachCell(function (cell, ci, row, ri) {
            cell.predators.forEach(function (item) {
                _this.pool.predators.push(item);
            });
            cell.prey.forEach(function (item) {
                _this.pool.prey.push(item);
            });
        });

        this.data.predators.push(_this.pool.predators.length);
        this.data.prey.push(_this.pool.prey.length);
    };
    createBoard = () => {
        for (var ri = 0; ri < this.options.rows; ri++) {
            var row = [];
            for (var ci = 0; ci < this.options.columns; ci++) {
                row.push({
                    predators: [],
                    prey: []
                });
            }
            this.board.push(row);
        }
    };
    run = (times) => {
        var _this = this;
        for (var t = 0; t < times; t++) {
            _this.cycle = t;
            _this.setup();
            _this.parse();
            _this.cleanup();
        }
    };
    setup = () => {
        if (this.cycle == 0) {
            this.createBoard();
        }

        this.add('predators');
        this.add('prey');

        return this;
    };
}

export default Darwin;
