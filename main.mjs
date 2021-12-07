import Darwin from './src/Darwin.mjs';

var darwin = new Darwin();
var rounds = 50;
darwin.run(rounds);

var height = Math.max(...darwin.data.predators);
var width = rounds * 21;

var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

var colors = {
    predators: 'teal',
    prey: 'blue'
};

Object.keys(darwin.data).forEach((key, ii) => {
    let item = darwin.data[key];
    svg.selectAll('svg')
        .data(item)
        .enter()
        .append('rect')
        .attr('fill', colors[key])
        .attr('x', function (d, i) {
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
