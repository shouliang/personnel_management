/**
 * Created by shouliang on 2016/6/14.
 */

var ctcdb = require('../models/ctcdb/index.js');
var SysAgency = ctcdb.SysAgency;

exports.list = function (options, callback) {
    SysAgency
        .findAll(options)
        .then(function (result) {
            callback(null, result);
        });
};