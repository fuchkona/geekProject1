function Cart(idCart, $idContainer) {
    Container.call(this, idCart);

    this.amount = 0; //Общая стоимость товаров
    this.goods = []; //Массив для хранения товаров
    this.$idContainer = $idContainer;

    //Получаем все товары, при созаднии корзины
    this.loadCartItems();
}

Cart.prototype = Object.create(Container.prototype);
Cart.prototype.constructor = Cart;

Cart.prototype.render = function () {
    var $CartDiv = $('<div />', {
        id: this.id
    });

    var $CartItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    for (var key in this.goods) {
        var tempGood = this.goods[key];
        var $good = $('<div />', {
            class: 'main-cart-good',
            'data-id': this.goods[key].g_id
        });

        var $title = $('<a />', {
            class: 'main-cart-good-title',
            text: tempGood.title,
            href: '#'
        });
        $good.append($title);

        var $subTitle = $('<div />', {
            class: 'main-cart-good-sub-title'
        });

        var $price = $('<span />', {
            text: tempGood.count + ' x ' +  tempGood.price.toFixed(2)
        });
        $subTitle.append($price);

        var $btn = $('<a />', {
            class: 'main-cart-good-del-btn',
            html: '<span class="fa fa-times-circle"></span>',
        });

        var $self = this;
        $btn.on('click', function (event) {
            var $goodContainer = $(event.target).closest('.main-cart-good');
            $self.removeGood($goodContainer.data('id'));
            $self.refresh();
        });

        $subTitle.append($btn);

        $good.append($subTitle);

        $CartItemsDiv.append($good);
    }

    $CartDiv.append($CartItemsDiv);

    var $amount = $('<p />', {
        class: 'main-cart-total',
        html: 'Total: <span>$' + this.amount.toFixed(2) + '</span>'
    });
    $CartDiv.append($amount);

    this.$idContainer.append($CartDiv);
};


/**
 * Метод получения/загрузки товаров
 */
Cart.prototype.loadCartItems = function () {
    var self = this;
    if (sessionStorage.getItem('goods') === null) {
        $.get({
            url: 'js/cart.json',
            dataType: 'json',
            context: this,
            success: function (data) {

                self.amount = data.amount;

                for (var itemKey in data.goods) {
                    self.goods.push(data.goods[itemKey]);
                }
                self.render();
            }
        });
    } else {
        this.goods = JSON.parse(sessionStorage.getItem('goods'));
        this.amount = JSON.parse(sessionStorage.getItem('amount'));
        this.render();
    }
};

Cart.prototype.add = function (g_id, title, price) {
    var newGood = {
        "g_id": +g_id,
        "title": title,
        "count": 1,
        "price": +price
    };

    this.amount += newGood.price;

    var found = false;
    for (var key in this.goods) {
        if (this.goods[key].g_id === newGood.g_id) {
            found = true;
            this.goods[key].count++;
        }
    }
    if (!found) {
        this.goods.push(newGood);
    }

    sessionStorage.setItem('goods', JSON.stringify(this.goods));
    sessionStorage.setItem('amount', JSON.stringify(this.amount));

    this.refresh(); //Перерисовываем корзину
};

Cart.prototype.removeGood = function (g_id) {
    var found = -1;
    for (var i = 0; i < this.goods.length; i++) {
        if (this.goods[i].g_id === g_id) {
            found = i;
        }
    }
    if (found > -1) {
        this.amount -= this.goods[found].count * this.goods[found].price;
        this.goods.splice(found, 1);
        sessionStorage.setItem('goods', JSON.stringify(this.goods));
        sessionStorage.setItem('amount', JSON.stringify(this.amount));
    }
};

Cart.prototype.refresh = function () {
    this.$idContainer.empty(); //Очищаем содержимое контейнера
    this.render();
};