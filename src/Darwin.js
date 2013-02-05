define('Darwin', ['underscore', 'Predator', 'Prey'], function (_,Predator,Prey) {
    var Darwin = function (options) {
        this.options = _.extend({
            rows: 5,
            columns: 5,
            predators : 16,
            prey : 16,
            minScore: 2,
            maxScore: 8
        }, options);

        this.board = [];
        this.cycle = 0;
        this.data = {
            predators:[],
            prey:[]
        };
        this.pool = {
            predators:[],
            prey:[]
        };

        this.setup();

        return this;
    };

    Darwin.prototype.eachRow = function (callback) {
        var _this = this;
        for(var ri = 0; ri < this.options.rows; ri++) {
            var row = _this.board[ri];
            callback(row,ri);
        }
    };

    Darwin.prototype.eachCell = function (callback) {
        var _this = this;
        _this.eachRow(function (row,ri){
            for (var ci = 0; ci < _this.options.columns; ci++) {
                var cell = row[ci];
                callback(cell, ci, row, ri);
            }
        });
    };

    Darwin.prototype.add = function (type) {
        if (!this.options[type] && !this.pool[type].length) { return; }
        var pool = this.pool[type] && this.pool[type].length ? this.pool[type].length : this.options[type];

        for (var pi = 0; pi < this.options[type]; pi++) {
            var item;

            var row = _.random(this.options.rows - 1);
            var col = _.random(this.options.columns - 1);
            var score = _.random(this.options.minScore, this.options.maxScore);

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

    var getHighest = function (memo, item) {
            if (!memo || memo.score < item.score) {
                return item;
            }

            return memo;
        },
        getLowest = function (memo, item) {
            if (!memo || memo.score > item.score) {
                return item;
            }

            return memo;
        },
        getCycleSet = function (group,cycle) {
            if (!group.length) { return group; }
            return _.map(group, function (item) {
                if (item.birth === cycle) {
                    return item;
                }
            });
        },
        coinFlip = function () {
            return _.random(1);
        };

    Darwin.prototype.parse = function () {
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
            highestPredator = predators.length ? _.reduce(predators, getHighest) : null;
            lowestPredator = predators.length ? _.reduce(predators, getLowest) : null;
            highestPrey = prey.length ? _.reduce(prey, getHighest) : null;
            lowestPrey = prey.length ? _.reduce(prey, getLowest) : null;

            console.log('Cell ' + [ri,ci].join(':'));
            console.log([cell.predators.length, cell.prey.length]);

            if (predators.length && prey.length) {

                _.each(prey, function (item) {

                    highestPredator = _.reduce(predators, getHighest);
                    if (highestPredator.score > item.score) {
                        highestPredator.eat(item,cell);
                        console.log('eaten');
                        console.log([cell.predators.length, cell.prey.length]);
                    } else if (highestPredator.score == item.score) {
                        var flip = coinFlip();
                        console.log('coin flip: ' + flip);
                        if (flip == 1) {
                            console.log('eaten');
                            highestPredator.eat(item,cell);
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

                _.each(predators, function (item, i) {
                    if (item.birth == _this.cycle - 2) {
                        console.log('starve');
                        item.die(cell);
                    }
                });
            }

            console.log('--');
        });
    };

    Darwin.prototype.cleanup = function () {
        var _this = this;
        //this.pool = { predators: [], prey: [] };
        this.eachCell(function (cell, ci, row, ri) {
            _.each(cell.predators, function (item) {
                _this.pool.predators.push(item);
            });
            _.each(cell.prey, function (item) {
                _this.pool.prey.push(item);
            });
        });

        this.data.predators.push(_this.pool.predators.length);
        this.data.prey.push(_this.pool.prey.length);
    };

    Darwin.prototype.createBoard = function () {
        for(var ri = 0; ri < this.options.rows; ri++) {
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

    Darwin.prototype.run = function (times) {
        var _this = this;
        for (var t = 0; t < times; t++) {
            _this.cycle = t;
            _this.setup();
            _this.parse();
            _this.cleanup();
        }
    };

    Darwin.prototype.setup = function () {

        if (this.cycle == 0) {
            this.createBoard();
        }

        this.add('predators');
        this.add('prey');

        return this;
    };

    return Darwin;
});
