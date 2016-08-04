$(function () {
    $("#getPrices").click(function () {
        var data = {
            itembasket: [
                13561, 16214, 14686, 13990
            ],
            stores: [211, 212], chainId: 7290696200003
        };
        var div = $(".resultsDiv").empty();
        $.post('/api/external/basket', data, function (result) {
            var items = result.items;
            
            for (var i = 0; items.length > i; i++) {
                div.append($('<span class="label label-primary storeName-label"> שם החנות: ' + items[i].storeName + '</label>'));
                div.append($('<span class="label label-primary storeName-label"> מזהה חנות:  ' + items[i].storeId + '</span>'));
                div.append($('<span class="label label-primary storeName-label"> סכום המחירים:  ' + items[i].totalItemPrice + '</span>'));
                // div.append($('<span class="label label-primary storeName-label"> Total Item Price Per ' + items[i].totalItemPricePer + '</span>'));

                var ul = $('<ul></ul>');
                for (var j = 0; items[i].Items.length > j; j++) {
                    var x = items[i].Items[j];
                    ul.append('<li> [' + x.id + '] ' + x.name + ' , ' + x.price + ' שח  [' + x.pricePer + ' , ' + x.quantity + '] </li>');
                }
                div.append(ul);
            }
        });
    });
});