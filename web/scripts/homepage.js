$(function () {
    $("#getPrices").click(function () {
        var data = {
            itembasket: [
                13561, 16214, 14686, 13990
            ],
            stores: [211, 212], chainId: 7290696200003
        };
        // $.blockUI();
        $.post('/api/external/basket', data, function (result) {
            // $.unblockUI();
            var items = result.items;
            var div = $(".resultsDiv");
            for (var i = 0; items.length > i; i++) {
                div.append($('<span class="label label-primary storeName-label"> Store name ' + items[i].storeName + '</label>'));
                div.append($('<span class="label label-primary storeName-label"> Store ID ' + items[i].storeId + '</span>'));
                div.append($('<span class="label label-primary storeName-label"> Total Item Price ' + items[i].totalItemPrice + '</span>'));
                div.append($('<span class="label label-primary storeName-label"> Total Item Price Per ' + items[i].totalItemPricePer + '</span>'));

                var ul = $('<ul></ul>');
                for (var j = 0; items[i].Items.length > j; j++) {
                    var x = items[i].Items[j];
                    ul.append('<li> [' + x.id + ']' + x.name + ' ' + x.price + ' [' + x.pricePer + ' X ' + x.quantity + '] </li>');
                }
                div.append(ul);
            }
        });
    });
});