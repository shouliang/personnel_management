/**
 * Created by shouliang on 2016/6/7.
 */

var ctcdb = require('../models/ctcdb/index.js');
var PersonnelDailyData = ctcdb.PersonnelDailyData;

exports.list = function (options, callback) {
    PersonnelDailyData
        .findAndCountAll(options)
        .then(function (result) {
            callback(null, result);
        });
};

exports.find = function (options, callback) {
    PersonnelDailyData
        .find(options)
        .then(function (result) {
            callback(null, result);
        });
};

exports.add = function (obj, callback) {
    PersonnelDailyData
        .create(obj)
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err);
        })
};

exports.update = function (options, callback) {
    PersonnelDailyData
        .update(options.obj, {where: options.where})
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err);
        })
};

exports.delete = function (options, callback) {
    PersonnelDailyData
        .update(options.obj, {where: options.where})
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err);
        })
};

exports.count = function (options, callback) {
    PersonnelDailyData
        .count(options)
        .then(function (count) {
            callback(null, count);
        });
};