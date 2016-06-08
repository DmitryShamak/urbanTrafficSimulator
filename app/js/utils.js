define(function() {
    var utils = {};

    utils.getRandom = function(max, min) {
        min = min || 0;
        return (Math.floor(Math.random()*(max - min)) + min);
    };

   return utils;
});