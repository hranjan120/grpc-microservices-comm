const express = require('express');
const router = express.Router();


const userController = require('../controller/userController');
/*
*-----------------------------Routes Section------------------------
*/
router.get('/get-method', userController.geteMethod);
router.post('/post-method', userController.postMethod);

/*
*-----------------------------
*/
module.exports = router;
