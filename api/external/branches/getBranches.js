module.exports.do = function (req, res, next) {
  
   var Branche = global.Objects.Branche;

  Branche.fetchAll().then(function (collection) {
    res.json(collection);
  }).catch(function (error) {
    console.log(error);
    res.send('An error occured');
  });
  
  
};
