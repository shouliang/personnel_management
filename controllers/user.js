/**
 * Created by shouliang on 2016/6/7.
 */
var path = require('path');
var Logger = require('../utils/logger').Logger('userController');
var _ = require('lodash');
var crypto = require('crypto');
var request = require('request');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '../config/config.json'))[env]['loginServiceUrl'];
var loginServiceUrl = [config.host, ':', config.port, config.path].join('');
var ctcdb = require('../models/ctcdb/index.js');
var SysUsers = ctcdb.SysUsers;

exports.view = function (req, res) {
    res.render("./user/login", {
        title: "人事管理系统登录"
    })
};

exports.login = function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    if (!_.isString(userName)) {
        req.flash("error", "请填写用户名");
        return res.redirect("back");
    }
    if (!_.isString(password)) {
        req.flash("error", "请填写密码");
        return res.redirect("back");
    }

    var md5 = crypto.createHash('md5');
    var pwd = md5.update(password).digest('hex');
    request.post({
        url: loginServiceUrl,
        form: {
            phone: userName,
            pwd: pwd,
            systemId: 9
        }
    }, function (err, httpResponse, result) {
        if (err) {
            Logger.error(JSON.stringify({message: "登录错误", error: err || err.statck}));
            return res.send({
                tag: "error",
                message: "系统错误"
            });
        }

        var data = JSON.parse(result);

        if (data && data.tag == "success") {
            if (data && data.data && data.data.agency.length) {

                // 组织机构Id
                req.session.agencyId = data.data.agency[0].id;
                req.session.agencyCode = data.data.agency[0].code;
                req.session.agencyName = data.data.agency[0].name;
                req.session.cityId = data.data.agency[0].CityId;
            }

            if (data && data.data && data.data.userInfo && data.data.userInfo.SysStaff) {

                req.session.user = data.data.userInfo.id;

                // 职位code与name
                req.session.staffCode = data.data.userInfo.SysStaff.code;
                req.session.staffName = data.data.userInfo.SysStaff.name;
            }

            return res.send({
                tag: 'success',
                message: '登录成功'
            });

        } else {
            return res.send({
                tag: data.tag,
                message: data.message
            });
        }

    });

};

exports.checkOut = function (req, res) {
    req.session.user = "";
    res.redirect("./user/login");
}

exports.updatePwd = function (req, res) {
    res.render("./user/updatePwd", {
        title: "修改密码",
        menu: "",
        success: req.flash("success").toString(),
        error: req.flash("error").toString()
    })
}

exports.postUpdatePwd = function (req, res) {
    var oldPwd;
    var pwd;
    var md5;

    function errorHandler(message) {
        req.flash("error", message);
        return res.redirect("back");
    }

    if (!req.body.oldPwd || !_.isString(req.body.oldPwd)) {
        return errorHandler("需要原密码");
    }
    oldPwd = req.body.oldPwd;
    if (!req.body.pwd || !_.isString(req.body.pwd)) {
        return errorHandler("需要新密码");
    }
    pwd = req.body.pwd;
    if (oldPwd == pwd) {
        return errorHandler("新密码不能与原密码相同");
    }
    if (pwd.length < 8) {
        return errorHandler("密码至少需要8位");
    }
    md5 = crypto.createHash('md5');
    oldPwd = md5.update(oldPwd).digest('hex');
    SysUsers.find({
        where: {
            id: req.session.user
        },
        attributes: ["id", "pwd"]
    })
        .then(function (sysUser) {
            if (!sysUser) {
                return errorHandler("账号错误");
            }
            if (oldPwd != sysUser.pwd) {
                return errorHandler("原密码错误");
            }
            var md5 = crypto.createHash('md5');
            pwd = md5.update(pwd).digest('hex');
            sysUser.pwd = pwd;
            sysUser.save()
                .then(function () {
                    req.flash("success", "请重新登录");
                    return res.redirect("/user/check_out")
                })
                .catch(function (error) {
                    Logger.error("修改密码错误", error);
                    return errorHandler("修改密码错误");
                })
        })
        .catch(function (error) {
            Logger.error("查询密码错误", error);
            return errorHandler("修改密码错误");
        })

}


