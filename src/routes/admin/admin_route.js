const express = require('express');
const router = express.Router();
const veriftyToken = require('../../middlewares/admin/route_auth_middleware')
const {loginAdmin, signupAdmin, forgetPassword,changeRole} = require('../../controllers/admin/admin_controller')

router.post('/login',loginAdmin);
router.post('/signup',signupAdmin);
router.post('/forget-password',forgetPassword);
router.post('/change-role',changeRole);

module.exports = router;