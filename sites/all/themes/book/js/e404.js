if (window.attachEvent)
    document.body.attachEvent('mousemove', onMouseMove);
else
    document.body.addEventListener('mousemove', onMouseMove, false);
    
var compass = $('.compass-back img');
var compassCenterX = compass.width() / 2;
var compassCenterY = compass.height() / 2;
var offset = compass.offset();

function onMouseMove(e) {
    var center_x = (offset.left) + (compassCenterX);
    var center_y = (offset.top) + (compassCenterY);
    var mouse_x = e.pageX; 
    var mouse_y = e.pageY;

    var radians = Math.atan2(mouse_x - center_x, center_y - mouse_y);

    compass.css('-moz-transform', 'rotate(' + radians + 'rad)');
    compass.css('-webkit-transform', 'rotate(' + radians + 'rad)');
    compass.css('-o-transform', 'rotate(' + radians + 'rad)');
    compass.css('-ms-transform', 'rotate(' + radians + 'rad)');
}