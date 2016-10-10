/**
 * Created by shouliang on 2016/6/24.
 */
var statisticsDb = require('../models/statisticsDb/index.js');
var ReportStoreGoodsOrderAllDaily = statisticsDb.ReportStoreGoodsOrderAllDaily;

exports.list = function (options, callback) {
    ReportStoreGoodsOrderAllDaily
        .findAndCountAll(options)
        .then(function (result) {
            callback(null, result);
        });
};

exports.find = function (options, callback) {
    ReportStoreGoodsOrderAllDaily
        .find(options)
        .then(function (result) {
            callback(null, result);
        });
};