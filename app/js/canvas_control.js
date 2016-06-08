define(["./utils"], function(utils) {
    var canvasControl = {
        layers: {}
    };

    canvasControl.addLayer = function(layer, params) {
        var element = document.createElement("canvas");
        element.id = layer + "-layer";
        element.className = "layer" + (params && params.className ? " " + params.className : "");
        element.width = "800";
        element.height = "600";

        var container = document.getElementById("layers");
        container.appendChild(element);

        canvasControl.layers[layer] = {
            element: element,
            context: element.getContext("2d")
        };
    };

    canvasControl.on = function(event, layer, callback) {
        if(!canvasControl.layers[layer]) {
            return;
        }

        canvasControl.layers[layer].element.addEventListener(event, callback);
    };

    canvasControl.fillLayer = function(layer) {
        if(!canvasControl.layers[layer]) {
            return;
        }

        var context = canvasControl.layers[layer].context;
        context.beginPath();
        context.rect(0, 0, 800, 600);
        context.fillStyle = "black";
        context.fill();
    };

    canvasControl.clearLayer = function(layer, alpha) {
        if(!canvasControl.layers[layer]) {
            return;
        }

        var context = canvasControl.layers[layer].context;
        context.clearRect(0, 0, 800, 600);
    };

    canvasControl.drawRect = function(layer, params) {
        if(!canvasControl.layers[layer]) {
            return;
        }

        var context = canvasControl.layers[layer].context;
        context.beginPath();
        context.rect(params.x, params.y, params.w, params.h);
        context.fillStyle = params.color;
        context.fill();
        if(params.stroke) {
            context.stroke();
        }
    };

    return canvasControl;
});