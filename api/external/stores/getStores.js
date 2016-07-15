module.exports.do = function (req, res, next) {

  var Store = global.Objects.Store;

  Store.fetchAll().then(function (collection) {
    res.json(collection);
  }).catch(function (error) {
    console.log(error);
    res.send('An error occured');
  });

};