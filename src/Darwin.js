define('Darwin', ['underscore', 'Preditor', 'Prey'], function (_,Preditor,Prey) {
    var Darwin = function (options) {
        this.options = _.extend({
            rows: 5,
            columns: 5,
            preditors : 16,
            prey : 16,
            minScore: 2,
            maxScore: 8
        }, options);

        this.setup();
    };

    Darwin.prototype.add = function (type) {
        for (var pi = 0; pi <= this.options[type]; pi++) {
            var row = _.random(this.options.rows - 1);
            var col = _.random(this.options.columns - 1);
            var score = _.random(this.options.minScore, this.options.maxScore);
            this.board[row][col][type].push(new Preditor(score));
        }
    };

    Darwin.prototype.setup = function () {
        this.board = [];
        for(var i = 1; i <= this.options.rows; i++) {
            var row = [];

            for (var ri = 1; ri <= this.options.columns; ri++) {
                row.push({
                    preditors: [],
                    prey: []
                });
            }
            this.board.push(row);
        }

        this.add('preditors');
        this.add('prey');

        return this;
    };

    return Darwin;
});
