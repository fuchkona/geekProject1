function Cart(idCart) {
    Container.call(this, idCart);

    this.countGoods = 0; //Общее количество товаров
    this.amount = 0; //Общая стоимость товаров
    this.CartItems = []; //Массив для хранения товаров

    //Получаем все товары, при созаднии корзины
    this.loadCartItems();
}

Cart.prototype = Object.create(Container.prototype);
Cart.prototype.constructor = Cart;

Cart.prototype.render = function (root55) {
  var $CartDiv = $('<div />', {
      id: this.id,
      text: 'Корзина'
  });

  var $CartItemsDiv = $('<div />', {
      id: this.id + '_items'
  });

  $CartItemsDiv.appendTo($CartDiv);
  $CartDiv.appendTo(root55);
};


/**
 * Метод получения/загрузки товаров
 */
Cart.prototype.loadCartItems = function () {
    var appendId = '#' + this.id + '_items';

    //var self = this;
    $.get({
        url: 'Cart.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var $CartData = $('<div />', {
                id: 'Cart_data'
            });

            this.countGoods = data.Cart.length;
            this.amount = data.amount;

            $CartData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
            $CartData.append('<p>Общая сумма: ' + this.amount + '</p>');

            $CartData.appendTo(appendId);

            for (var itemKey in data.Cart)
            {
                this.CartItems.push(data.Cart[itemKey]);
            }
        }
    });
};

Cart.prototype.add = function (idProduct, price) {
    var CartItem = {
        "id_product": idProduct,
        "price": price
    };

    this.countGoods++;
    this.amount += price;
    this.CartItems.push(CartItem);
    this.refresh(); //Перерисовываем корзину
};

Cart.prototype.refresh = function () {
    var $CartData = $('#Cart_data');
    $CartData.empty(); //Очищаем содержимое контейнера
    $CartData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
    $CartData.append('<p>Общая сумма: ' + this.amount + '</p>');
};