/**
 * Created by shouliang on 2016/6/14.
 */

/**
 * Created by shouliang on 2016/6/6.
 */

var express = require('express');
var router = express.Router();

var sysAgencyController = require('../controllers/sysAgency')

router.get('/list',sysAgencyController.list);

module.exports = router;