var express = require('express');
var router = express.Router();

var personnelBasicInfo = require('./personnelBasicInfo');
var sysAgency = require('./sysAgency');
var personnelDailyData = require('./personnelDailyData');
var user = require('./user');

// 人事基础信息
router.use('/personnelBasicInfo',personnelBasicInfo);

// 组织机构
router.use('/sysAgency',sysAgency);

// 每日数据
router.use('/personnelDailyData',personnelDailyData);

// 用户
router.use('/user',user);

// login跳转
router.get('/index', function (req, res) {
    res.redirect('/personnelBasicInfo/view');
});

router.get('/', function (req, res) {
    res.redirect('/personnelBasicInfo/view');
});

module.exports = router;
