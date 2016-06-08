require(["./js/canvas_control", "./js/map"], function(canvasControl, Map) {
    var drawMap = function(map, layer, conf) {
        canvasControl.clearLayer(layer);
        canvasControl.fillLayer("static");
        map.forEach(function(row, y) {
            row.forEach(function(cell, x) {
                canvasControl.drawRect(layer, {
                    x: x * conf.cellSize,
                    y: y * conf.cellSize,
                    color: cell.color,
                    stroke: cell.stroke || false,
                    w: conf.cellSize,
                    h: conf.cellSize
                });
            });
        });
    };

    var start = function(delay) {
        var conf = {
            cellSize: 20,
            width: 800,
            height: 600
        };

        if(canvasControl.interval) {
            clearInterval(interval);
        }

        var cityMap = localStorage.getItem("cityMap");
        var map = cityMap ? JSON.parse(cityMap) : Map.generate(conf);

        canvasControl.addLayer("static");
        drawMap(map, "static", conf);

        canvasControl.addLayer("dynamic", {
            className: "hidden-cursor"
        });
        canvasControl.on("click", "dynamic", function(ev) {
            console.log(ev);
            var x = ev.layerX,
                y = ev.layerY;


            //sate element to map && render static layer
        });


        canvasControl.on("mousemove", "dynamic", function(ev) {
            var layer = "dynamic",
                x = Math.floor(ev.layerX / conf.cellSize),
                y = Math.floor(ev.layerY / conf.cellSize);

            canvasControl.clearLayer(layer, 0.1);
            canvasControl.drawRect(layer, {
                x: x * conf.cellSize,
                y: y * conf.cellSize,
                color: "rgba(255,255,255,0.2)",
                w: conf.cellSize,
                h: conf.cellSize
            });
        });

        //canvasControl.interval = setInterval(function() {
        //    canvasControl.clearLayer("static");
        //
        //
        //}, delay);
    };

    start(1);
});