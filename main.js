require.config({
    paths: {
        'underscore': 'vendor/underscore',
        'Darwin' : 'src/Darwin',
        'Preditor' : 'src/Preditor',
        'Prey' : 'src/Prey'
    }
});

require(['Darwin'], function (Darwin) {
    var darwin = new Darwin();
    console.log(darwin);
});