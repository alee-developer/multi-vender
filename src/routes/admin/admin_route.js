const express = require('express');
const router = express.Router();

const {loginAdmin, signupAdmin} = require('../../controllers/admin/admin_controller')

router.post('/login',loginAdmin);
router.post('/signup',signupAdmin);

module.exports = router;