const express = require('express');
const router = express.Router();

const {add,single,all,deleteItem,update} = require('../../controllers/category/category_controller');

router.post('/',add);
router.get('/:id',single);
router.put('/:id',update);
router.delete('/:id',deleteItem);
router.get('/',all);

module.exports = router;