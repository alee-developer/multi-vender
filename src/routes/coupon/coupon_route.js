const express = require('express');
const router = express();

const {add,update,single,all,deleteItem} = require('../../controllers/coupon/coupon_controller');

router.post('/',add);
router.put('/:id',update);
router.get('/:id',single);
router.get('/:',all);
router.delete('/', deleteItem);

module.exports = router;