(function() {
    "use strict";

    var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var g = canvas.getContext("2d");

    // exterior angle
    var degrees072 = toRadians(72);

    /* After scaling we'll have 2 sides plus a gap occupying the length
       of a side before scaling. The gap is the base of an isosceles triangle
       with a base angle of 72 degrees. */
    var scaleFactor = 1 / (2 + Math.cos(degrees072) * 2);

    var margin = 20;
    var limit = 0;

    function drawPentagon(x, y, side, depth) {
        var angle = 3 * degrees072; // starting angle

        if (depth == 0) {
            g.beginPath();
            g.moveTo(x, y);

            // draw from the top
            for (var i = 0; i < 5; i++) {
                x = x + Math.cos(angle) * side;
                y = y - Math.sin(angle) * side;
                g.lineTo(x, y);
                angle += degrees072;
            }

            g.fillStyle = "#3498DB";
            g.closePath();
            g.fill();
        } else {
            side *= scaleFactor;

            /* Starting at the top of the highest pentagon, calculate
               the top vertices of the other pentagons by taking the
               length of the scaled side plus the length of the gap. */
            var distance = side + side * Math.cos(degrees072) * 2;

            /* The top positions form a virtual pentagon of their own,
               so simply move from one to the other by changing direction. */
            for (var j = 0; j < 5; j++) {
                x = x + Math.cos(angle) * distance;
                y = y - Math.sin(angle) * distance;
                drawPentagon(x, y, side, depth - 1);
                angle += degrees072;
            }
        }
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function draw() {
        g.clearRect(0, 0, canvas.width, canvas.height);

        var size = 700;
        var w = canvas.width;
        var radius = size / 2 - 2 * margin;
        var side = radius * Math.sin(Math.PI / 5) * 2;

        drawPentagon(
            w / 2,
            (canvas.height - size) / 2 + 3 * margin,
            side,
            limit
        );

        limit++;
        if (limit >= 6) limit = 0;
    }

    draw();

    setInterval(function() {
        draw();
    }, 3000);
})();
