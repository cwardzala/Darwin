require.config({
    paths: {
        'underscore' : 'vendor/underscore',
        'Darwin'     : 'src/Darwin',
        'Predator'   : 'src/Predator',
        'Prey'       : 'src/Prey'
    },
    shim : {
        'vendor/d3' : {exports: 'd3'}
    }
});

require(['underscore','Darwin', 'vendor/d3'], function (_,Darwin, d3) {
    var darwin = new Darwin();
    var rounds = 50;
    darwin.run(rounds);

    var height = _.max(darwin.data.predators);
    var width = rounds * 21;

    var svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height);
    var colors = {
        predators: "teal",
        prey: "blue"
    };
    _.each(darwin.data, function (item, ii) {
        svg.selectAll('svg')
            .data(item)
            .enter()
            .append('rect')
            .attr("fill", colors[ii])
            .attr('x', function (d,i) {
                return i * 21;
            })
            .attr('y', function (d) {
                return height - d;
            })
            .attr('width', 20)
            .attr('height', function (d) {
                return d;
            });
    });
});
