$('#browse-btn').on('click', function () {
    toogle_browse_show();
});

$('#browse-categories').on('mouseleave', function () {
    toogle_browse_show();
});

function toogle_browse_show() {
    var $body = $('#browse-categories');
    var $btn = $('#browse-btn');
    $body.css({top: $btn.offset().top + $btn.height() + 4, left: $btn.offset().left - 8});
    $body.toggleClass('show');
}

function goToUrl(url) {
    window.location = url;
}

$('.products-item-hover, .featured-items-item-hover').on('click', function (e) {
    if (e.target !== this)
        return;
    goToUrl('product.html')
});