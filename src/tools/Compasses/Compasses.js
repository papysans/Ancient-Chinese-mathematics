$(function() {
    var dragging = false;
    var startAngle = 0;
    var startMouseAngle = 0;

    function getAngle(x, y) {
        var centerX = $(window).width() / 2;
        var centerY = $(window).height() * 0.38;
        return Math.atan2(y - centerY, x - centerX);
    }

    function getRadius(angle) {
        // 线性插值计算半径
        var minAngle = -6, maxAngle = 20;
        var minRadius = 25, maxRadius = 420;
        var radius = (angle - minAngle) / (maxAngle - minAngle) * (maxRadius - minRadius) + minRadius;
        return radius;
    }

    $('#左, #右').mousedown(function(e) {
        dragging = true;
        startAngle = parseFloat($(this).attr('data-angle')) || 0;
        startMouseAngle = getAngle(e.pageX, e.pageY);
        e.preventDefault();
    });

    $(document).mousemove(function(e) {
        if (dragging) {
            var angle = getAngle(e.pageX, e.pageY);
            var diff = angle - startMouseAngle;
            var newAngle = startAngle + diff * 180 / Math.PI;
            newAngle = Math.min(Math.max(newAngle, -6), 20);  // 限制角度在0-20之间
            $('#左').css('transform', 'rotate(' + newAngle + 'deg)');
            $('#右').css('transform', 'rotate(' + -newAngle + 'deg)');
            $('#左, #右').attr('data-angle', newAngle);

            var radius = getRadius(newAngle);
            $('.radius').text('半径: ' + Math.round(radius) + 'px');  // 更新半径显示
            console.log('半径: ' + radius + 'px');

            $('.circle').css({
                width: radius * 1 + 'px',
                height: radius * 1 + 'px'
            });
        }
    });

    $(document).mouseup(function() {
        dragging = false;
    });
});