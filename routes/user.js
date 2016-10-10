/**
 * Created by shouliang on 2016/6/14.
 */

/**
 * Created by shouliang on 2016/6/6.
 */

var express = require('express');
var router = express.Router();

var userController = require('../controllers/user')

router.get('/login',userController.view);

router.post('/login',userController.login);

router.get('/check_out',userController.checkOut);

router.get('/updatePwd',userController.updatePwd);

router.post("/updatePwd",userController.postUpdatePwd);

module.exports = router;