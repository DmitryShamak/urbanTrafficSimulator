define(["./utils"], function(utils) {
    var control = {};
    var config = {
        empty: {
          color: "rgba(255,255,255,0.1)",
          stroke: true
        },
        road: {
            type: "road",
            color: "rgb(33,33,33)"
        },
        grass: {
            type: "grass",
            color: "rgb(151, 206, 90)"
        },
        line: {
            type: "line",
            color: "rgb(200, 200, 200)"
        },
        border: {
            type: "border",
            color: "rgb(66,66,66)"
        }
    };

    control.generate = function(params) {
        var map = [];
        var rows = Math.floor(params.height/params.cellSize),
            cols = Math.floor(params.width/params.cellSize);
        var i = 0,
            j = 0;

        for(i=0; i<rows; i++) {
            map.push([]);
            for(j=0; j<cols; j++) {
                map[i][j] = config.empty;
            }
        }

        return map;
    };

    return control;
});