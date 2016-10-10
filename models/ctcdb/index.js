/**
 * Created by shouliang on 2016/6/6.
 */

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '../../config/config.json'))[env]['dataBase']['ctcDb'];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (/\.\w+?$/.exec(file)[0] == '.js') && (file !== 'index.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.Ctcdb = sequelize;
db.Sequelize = Sequelize;

module.exports = db;