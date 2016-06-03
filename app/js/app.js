(function() {
    var layers = {};

    var addLayer = function(layer) {
        var element = document.createElement("canvas");
        element.id = layer + "-layer";
        element.className = "layer";
        element.width = "800";
        element.height = "600";

        var container = document.getElementById("layers");
        container.appendChild(element);

        layers[layer] = {
            context: element.getContext("2d")
        };
    };

    var fillLayer = function(layer) {
        if(!layers[layer]) {
            return;
        }

        var context = layers[layer].context;
        context.beginPath();
        context.rect(0, 0, 800, 600);
        context.fillStyle = "black";
        context.fill();
    };

    var clearLayer = function(layer) {
        if(!layers[layer]) {
            return;
        }

        var context = layers[layer].context;
        context.beginPath();
        context.rect(0, 0, 800, 600);
        context.fillStyle = "rgba(0,0,0,1)";
        context.fill();
    };

    var drawRect = function(layer, params) {
        if(!layers[layer]) {
            return;
        }

        var context = layers[layer].context;
        context.beginPath();
        context.rect(params.x, params.y, params.w, params.h);
        context.fillStyle = params.color;
        context.fill();
    };

    var getRandom = function(max) {
        return Math.floor(Math.random()*max);
    };

    //init
    addLayer("static");
    addLayer("dynamic");

    fillLayer("static");

    var interval;

    var start = function(delay) {
        if(interval) {
            clearInterval(interval);
        }
        interval = setInterval(function() {
            clearLayer("dynamic");

            var map = [],
                rows = 60,
                cells = 80,
                cellSize = 10;

            for(var i=0; i<rows; i++) {
                map.push([]);

                for(var j=0; j<cells; j++) {
                    var value = (getRandom(10) == 0) ? 1 : 0;
                    map[i][j] = value;

                    if(value == 1) {
                        var color = "white";
                        var rand = getRandom(10);

                        switch(rand) {
                            case 0:
                                color = "green";
                                break;
                            case 1:
                                color = "yellow";
                                break;
                            case 2:
                                color = "red";
                                break;
                        }

                        drawRect("dynamic", {
                            w: cellSize,
                            h: cellSize,
                            y: i * cellSize,
                            x: j * cellSize,
                            color: color
                        });
                    }
                }
            }
        }, delay);
    };

    var elem = document.createElement("input");
    elem.onchange = function(ev) {
        start(ev.target.value);
    };
    document.body.appendChild(elem);

    start(10);
})();