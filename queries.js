var promise = require('bluebird');
var DB_ADDRESS = "";

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = DB_ADDRESS;
var db = pgp(connectionString);

// add query functions
function getAllItems(req, res, next) {
    db.any('select * from consume')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL items'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createItem(req, res, next) {
    req.body.id = parseInt(req.body.id);
    req.body.amount = parseInt(req.body.amount);
    req.body.linenumber = parseInt(req.body.linenumber);
    db.none('insert into consume(id, date, store, amount, linenumber)' +
            'values(${id}, ${date}, ${store}, ${amount}, ${linenumber})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Item inserted'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateItem(req, res, next) {
    db.none('update consume set date=$1, store=$2, amount=$3, linenumber=$4 where id=$5',
        [req.body.date, req.body.store, parseInt(req.body.amount),
            parseInt(req.body.linenumber), parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated item'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeItem(req, res, next) {
    var itemID = parseInt(req.params.id);
    db.result('delete from consume where id = $1', itemID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} item'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllItems: getAllItems,
    //getItem: getItem,
    createItem: createItem,
    updateItem: updateItem,
    removeItem: removeItem
};
