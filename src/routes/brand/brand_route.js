const express = require('express');
const router = express.Router();
const {add,update,single,all,deleteBrand} = require('../../controllers/brand/brand_controller');


router.post('/',add);
router.put('/:id',update);
router.get('/:id',single);
router.get('/',all);
router.delete('/:id',deleteBrand);

module.exports = router;
