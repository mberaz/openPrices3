module.exports.do = function (req, res, next) {
    var items = global.ItembasketObject;
    var itemsList = req.body.itembasket;// global.ItembasketObject.Itembasket;
    var storeList = req.body.stores;//global.ItembasketObject.stores;
    var chainId = req.body.chainId;

    var selectQ = global.Knex.from('prices').select()
        .whereIn('prices.store_id', storeList)
        .whereIn('prices.item_id', itemsList);

    var storesQ = global.Knex.from('stores_meta')
        .distinct('stores_meta.store_id', 'stores_meta.store_name')
        .select().whereIn('stores_meta.store_id', storeList);

    var itemsQ = global.Knex.from('items_meta')
        .distinct('items_meta.item_id', 'items_meta.item_name')
        .select()
        //.where({ 'items_meta.chain_id': chainId })
        .whereIn('items_meta.item_id', itemsList);

    Promise.all([selectQ, storesQ, itemsQ]).then(function (values) {
        var collection = values[0];
        var storesMeta = values[1];
        var itemsMeta = values[2];
        var groupedByStore = collection.groupBy(function () { return this.store_id; });
        // var haveingAllTheProducts = groupedByStore.where(function (x)
        //                             { return x.Items.length == global.ItembasketObject.Itembasket });
        var ordered = groupedByStore.orderBy(function () {
            return this.Items.sum(function () { return this.price; });
        });

        var outList = [];
        for (var i = 0; i < ordered.length; i++) {
            var storeMeta=storesMeta.first(function (x) { return x.store_id === ordered[i].Key; });
            outList[i] = {
                storeName:storeMeta?storeMeta.store_name:'',
                storeId: ordered[i].Key,
                totalItemPrice:Math.round(ordered[i].Items.sum(function () { return this.price; })) ,
                totalItemPricePer: Math.round(ordered[i].Items.sum(function () { return this.unit_of_measure_price; })),
                Items: []
            };
            for (var j = 0; j < ordered[i].Items.length; j++) {
                var old = ordered[i].Items[j];
                var itemMeta = itemsMeta.first(function (x) { return x.item_id === old.item_id; });
                var item = {
                    name: itemMeta ? itemMeta.item_name : '',
                    id: old.item_id,
                    price: old.price,
                    pricePer: old.unit_of_measure_price,
                    quantity: old.quantity
                };

                if (old.unit_of_measure) {
                    item.unitOfMeasure = old.unit_of_measure;
                }

                outList[i].Items.push(item);
            }
        }
        res.json({
            items: outList
        });
    });
}

// {
// "itembasket" : [
//     13561,
//     16214,
//     14686,
//     13990
// ],
// "stores" : [211,212],
  //"chainId":7290696200003
// }
