const express = require('express');
const router = express.Router();
const {add,all,single,update,deleteItem} = require('../../controllers/subCategory/subcategory_controller');

router.post('/',add);
router.get('/',all);
router.get('/:id',single);
router.put('/:id',update);
router.delete('/:id',deleteItem);

module.exports = router;