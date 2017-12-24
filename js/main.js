$(function () {
    var cart = new Cart(777, $('#main-cart-body'));

    // just a little function to go away ^_^
    function goToUrl(url) {
        window.location = url;
    }

    // show browse panel on click on browse btn
    $('#browse-btn').on('click', function () {
        toggleBrowseShow();
    });

    // hide browse panel on mouse leave
    $('#browse-categories').on('mouseleave', function () {
        toggleBrowseShow();
    });

    // toggle browse panel visibility
    function toggleBrowseShow() {
        togglePanelVisible($('#browse-categories'), $('#browse-btn'), -8, 4);
    }

    // toggle main cart visibility
    $('#main-cart-btn').on('click', function () {
        togglePanelVisible($('#main-cart'), $('#main-cart-btn'), -14, 16);
    });

    // function for toggle panel's visibility
    function togglePanelVisible($panel, $object, adjustX, adjustY) {
        $panel.css({top: $object.offset().top + $object.height() + adjustY, left: $object.offset().left + adjustX})
        $panel.toggleClass('show');
    }


    $('.products-item').on('click', '.products-item-hover, .products-item-title', function (e) {
        if (e.target !== this)
            return;
        goToUrl('product.html')
    });

    $('.add-to-cart-btn').on('click', function (e) {
        var $target = e.target === this ? $(e.target) : $(e.target).parent();
        var $container = $target.closest('.products-item');
        var g_id = $container.attr('id').match(/\d+/)[0];
        var title = $container.find('.products-item-title').text();
        var price = $container.find('.products-item-price').text().match(/\d+\.+\d+/)[0];
        cart.add(g_id, title, price);
    });
});