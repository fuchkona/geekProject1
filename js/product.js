/**
 * Created by fuchkona on 26.10.2017.
 */
$('.products-item-hover').on('click', function (e) {
    if (e.target !== this)
        return;
    goToUrl('product.html')
});