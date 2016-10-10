/**
 * Created by shouliang on 2016/6/7.
 */

var ctcdb = require('../models/ctcdb/index.js');
var PersonnelBasicInfo = ctcdb.PersonnelBasciInfo;

exports.list = function (options, callback) {
    PersonnelBasicInfo
        .findAndCountAll(options)
        .then(function (result) {
            callback(null, result);
        });
};

exports.find = function (options, callback) {
    PersonnelBasicInfo
        .find(options)
        .then(function (result) {
            callback(null, result);
        });
};

exports.add = function (obj, callback) {
    PersonnelBasicInfo
        .create(obj)
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err);
        })
};

exports.update = function (options, callback) {
    PersonnelBasicInfo
        .update(options.obj, {where: options.where})
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err);
        })
};

exports.delete = function (options, callback) {
    PersonnelBasicInfo
        .update(options.obj, {where: options.where})
        .then(function (result) {
            callback(null, result);
        })
        .catch(function (err) {
            callback(err);
        })
};

exports.count = function (options, callback) {
    PersonnelBasicInfo
        .count(options)
        .then(function (count) {
            callback(null, count);
        });
};
