define(['underscore', 'Preditor', 'Prey'], function (_,Preditor,Prey) {
    var Darwin = function (options) {
        this.options = _.extend({
            rows: 4,
            columns: 4
        }, options);

        this.setup();
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
        return this;
    };

    return Darwin;
});
