function Basket(idBasket) {
    Container.call(this, idBasket);

    this.countGoods = 0; //Общее количество товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров

    //Получаем все товары, при созаднии корзины
    this.loadBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function (root55) {
  var $basketDiv = $('<div />', {
      id: this.id,
      text: 'Корзина'
  });

  var $basketItemsDiv = $('<div />', {
      id: this.id + '_items'
  });

  $basketItemsDiv.appendTo($basketDiv);
  $basketDiv.appendTo(root55);
};


/**
 * Метод получения/загрузки товаров
 */
Basket.prototype.loadBasketItems = function () {
    var appendId = '#' + this.id + '_items';

    //var self = this;
    $.get({
        url: 'basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var $basketData = $('<div />', {
                id: 'basket_data'
            });

            this.countGoods = data.basket.length;
            this.amount = data.amount;

            $basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
            $basketData.append('<p>Общая сумма: ' + this.amount + '</p>');

            $basketData.appendTo(appendId);

            for (var itemKey in data.basket)
            {
                this.basketItems.push(data.basket[itemKey]);
            }
        }
    });
};

Basket.prototype.add = function (idProduct, price) {
    var basketItem = {
        "id_product": idProduct,
        "price": price
    };

    this.countGoods++;
    this.amount += price;
    this.basketItems.push(basketItem);
    this.refresh(); //Перерисовываем корзину
};

Basket.prototype.refresh = function () {
    var $basketData = $('#basket_data');
    $basketData.empty(); //Очищаем содержимое контейнера
    $basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
    $basketData.append('<p>Общая сумма: ' + this.amount + '</p>');
};