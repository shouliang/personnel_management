/**
 * Created by shouliang on 2016/6/6.
 */
var express = require('express');
var router = express.Router();

var personnelBasicInfoController = require('../controllers/personnelBasicInfo')

router.get('/view',personnelBasicInfoController.view);

router.post('/list',personnelBasicInfoController.list);

router.post('/add',personnelBasicInfoController.add);

router.post('/update',personnelBasicInfoController.update);

router.post('/delete',personnelBasicInfoController.delete);

module.exports = router;