module.exports.do = function (req, res, next) {
    var items = global.ItembasketObject;
    var itemsList = req.body.itembasket;// global.ItembasketObject.Itembasket;
    var storeList = req.body.stores;//global.ItembasketObject.stores;

    global.Knex.from('prices').select()
        .whereIn('prices.store_id', storeList)
        .whereIn('prices.item_id', itemsList).then(function (collection) {
            var groupedByStore = collection.groupBy(function () { return this.store_id; });
            // var haveingAllTheProducts = groupedByStore.where(function (x)
            //                             { return x.Items.length == global.ItembasketObject.Itembasket });

            var ordered = groupedByStore.orderBy(function () {
                return this.Items.sum(function () { return this.price });
            });

            res.json({
                items: ordered
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
// "stores" : [211,212]
// }
