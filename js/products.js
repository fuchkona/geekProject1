$(function () {
    var slider = document.getElementById('price-slider');
    var $price_min = $('#price_min');
    var $price_max = $('#price_max');

    noUiSlider.create(slider, {
        start: [52, 400],
        connect: true,
        range: {
            'min': 0,
            'max': 500
        }
    });

    slider.noUiSlider.on('update', function (values, handle) {
        var value = values[handle];
        if (handle) {
            $price_max.text("$" + Math.round(value));
        } else {
            $price_min.text("$" + Math.round(value));
        }
    });

    $('.products-left-panel-menu-title').on('click', function () {
        productsLeftPanelMenuShow(this);
    });

    function productsLeftPanelMenuShow(context) {
        var $menu = $(context).next('.products-left-panel-menu');
        $menu.toggleClass('show');
        $(context).toggleClass('active');
        $(context).children('span').toggleClass('fa-caret-up fa-caret-down');
    }
});