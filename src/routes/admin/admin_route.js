const express = require('express');
const router = express.Router();
const veriftyToken = require('../../middlewares/admin/route_auth_middleware')
const {loginAdmin, signupAdmin, forgetPassword,changeRole,updateProfile,getProfile,updateStatus} = require('../../controllers/admin/admin_controller')

router.post('/login',loginAdmin);
router.post('/signup',signupAdmin);
router.post('/forget-password',forgetPassword);
router.put('/profile/:id',updateProfile);
router.get('/profile/:id',getProfile);
router.patch('/profile/:id/:status',updateStatus);
router.post('/change-role/:id',changeRole);

module.exports = router;