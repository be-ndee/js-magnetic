var size = 30;
var rows = 20;
var cols = 20;

function initFieldBackground () {
    $field = $('#field');

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            $box = $('<div>');
            $line = $('<svg height="' + size + '" width="' + size + '">');
            var svg = '<line x1="0" y1="0" x2="' + size + '" y2="' + size + '" stroke="rgb(0,0,0)" stroke-width="2" />';
            // svg += '<circle cx="50" cy="50" r="50" stroke="rgb(0,0,0)" stroke-width="2" fill="none" />'
            $line.html(svg);
            $box.append($line);
            $box.addClass('box');
            $box.css('width', size);
            $box.css('height', size);
            $box.css('position', 'absolute');
            $box.css('left', (size + 1) * col);
            $box.css('top', (size + 1) * row);
            $field.append($box);
        }
    }
}

function initMouseMove () {
    // $('#field').mousemove(function (event) {
    $('body').mousemove(function (event) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        $box = $('#my-box');

        $('div.box').each(function (index, box) {
            var boxX = cssPXToInt($(box).css('left')) + (size/2);
            var boxY = cssPXToInt($(box).css('top')) + (size/2);

            var a = boxY - mouseY;
            var b = boxX - mouseX;

            var angle = calcAngle(a, b);

            if (a >= 0 && b <= 0) {
                angle = 360 + angle;
            } else if (a <= 0 && b >= 0) {
                angle = 180 + angle;
            } else if (a >= 0 && b >= 0) {
                angle = 180 + angle;
            } else if (a >= 0 && b <= 0) {
                angle = 360 - angle;
            }

            $(box).css('transform', 'rotate(' + angle + 'deg)');
        });
    });
}

function calcAngle (a, b) {
    return Math.atan(a/b) * (180 / Math.PI);
}

function cssPXToInt (pxString) {
    return parseInt(pxString);
    return parseInt(pxString.slice(0, pxString.length - 2));
}

$(document).ready(function () {
    initFieldBackground();
    initMouseMove();
});
