$(function () {
    var slider = document.getElementById('price-slider');
    var price_min = document.getElementById('price_min');
    var price_max = document.getElementById('price_max');

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
            price_max.innerHTML = "$" + Math.round(value);
        } else {
            price_min.innerHTML = "$" + Math.round(value);
        }
    });

    $('.products-left-panel-menu-title').on('click', function () {
        products_left_panel_menu_show(this);
    });

    function products_left_panel_menu_show(context) {
        var $menu = $(context).next('.products-left-panel-menu');
        $menu.toggleClass('show');
        $(context).toggleClass('active');
        $(context).children('span').toggleClass('fa-caret-up fa-caret-down');
    }
});