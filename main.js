require.config({
    paths: {
        'underscore' : 'vendor/underscore',
        'Darwin'     : 'src/Darwin',
        'Predator'   : 'src/Predator',
        'Prey'       : 'src/Prey'
    }
});

require(['underscore','Darwin'], function (_,Darwin) {
    var darwin = new Darwin();
    console.log(darwin);

    darwin.parse();
    darwin.cleanup();
});
