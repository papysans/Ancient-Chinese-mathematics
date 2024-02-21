$(function() {
    var $caliperBottom = $('#caliperBottom');
    var $caliperTop = $('#caliperTop');
    var $caliperMiddle = $('#caliperMiddle');
    var initialLeft = $caliperMiddle.offset().left;

    $caliperBottom.add($caliperTop).draggable({
        axis: 'x',    
        drag: function(event, ui) {
            var left = ui.position.left;
            var parentWidth = ui.helper.parent().width();
            if (left < 0 * parentWidth) {
                ui.position.left = 0 * parentWidth;
            } else if (left > 0.3 * parentWidth) {
                ui.position.left = 0.3 * parentWidth;
            }

            var currentLeft = ui.helper.offset().left;
            var distance = Math.round(Math.abs(currentLeft - initialLeft));
            console.log("长度: " + distance + "px");
            $('#dragLength').text("长度: " + distance + "px");

            $caliperBottom.css('left', ui.position.left + 'px');

        }
    });
});