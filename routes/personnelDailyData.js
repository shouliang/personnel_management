/**
 * Created by shouliang on 2016/6/6.
 */

var express = require('express');
var router = express.Router();

var personnelDailyDataController = require('../controllers/personnelDailyData');

router.get('/view',personnelDailyDataController.view);

router.post('/list',personnelDailyDataController.list);

router.post('/add',personnelDailyDataController.addOrUpdate);

router.post('/update',personnelDailyDataController.addOrUpdate);

router.post('/delete',personnelDailyDataController.delete);

module.exports = router;