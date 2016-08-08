module.exports.do = function (req, res, next) {
    var chanisQ = global.Knex.from('chains').where('chain_id', req.params.id).select('chain_id', 'chain_name');

    Promise.all([chanisQ]).then(function (values) {
        var chain = values[0][0];
        res.json(chain);
    });
}