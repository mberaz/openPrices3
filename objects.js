
var Objects = {};
 Objects.Chains = global.Bookshelf.Model.extend({
    tableName: 'chains'
});

 Objects.Store = global.Bookshelf.Model.extend({
    tableName: 'stores'
 });

 Objects.StoreMeta = global.Bookshelf.Model.extend({
    tableName: 'stores_meta'
 });
 
 Objects.Item = global.Bookshelf.Model.extend({
    tableName: 'items'
 });
 
 Objects.ItemMeta = global.Bookshelf.Model.extend({
    tableName: 'items_meta'
 });

 Objects.Promo = global.Bookshelf.Model.extend({
    tableName: 'promos'
 });

 Objects.PromoStore = global.Bookshelf.Model.extend({
    tableName: 'promos_stores'
 });

 Objects.PromoItem = global.Bookshelf.Model.extend({
    tableName: 'promos_items'
 });
  
module.exports = Objects;
  
  
  