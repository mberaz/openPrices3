module.exports.do = function(req, res, next) {

   var Product = global.Objects.Product;

  Product.fetchAll().then(function (collection) {
    res.json(collection);
  }).catch(function (error) {
    console.log(error);
    res.send('An error occured');
     });
};
