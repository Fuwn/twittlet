$(document).ready(function () {
    $(window).scroll(function () {
        $('.hideme').each(function (i) {
            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_object) {
                $(this).animate({
                    'opacity': '1'
                }, 500);
            }
        });
    });
    $('.hideme').each(function (i) {
        var bottom_of_object = $(this).position().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if (bottom_of_window > bottom_of_object) {
            $(this).animate({
                'opacity': '1'
            }, 500);
        }
        if (document.getElementById("heading")) {
            $(document.getElementById("heading")).animate({
                'opacity': '1'
            }, 500);
        }
        if (document.getElementById("title-quotes")) {
            $(document.getElementById("title-quotes")).animate({
                'opacity': '1'
            }, 1500);
        }
        // document.getElementById("heading").animate({
        //     'opacity': '1'
        // }, 500);
    });
});

$(document).ready(function () {
    var degrees = 0;
    $('.rotateme').click(function rotateMe(e) {
        degrees += 720;
        //$('.rotateme').addClass('rotated'); // for one time rotation

        $('.rotateme').css({
            'transform': 'rotate(' + degrees + 'deg)',
            '-ms-transform': 'rotate(' + degrees + 'deg)',
            '-moz-transform': 'rotate(' + degrees + 'deg)',
            '-webkit-transform': 'rotate(' + degrees + 'deg)',
            '-o-transform': 'rotate(' + degrees + 'deg)'
        });
    });
});