const express = require('express');
const router = express.Router();

const {add,update,single,all,deleteVariant} = require('../../controllers/variant/variant_controller');

router.post('/',add);
router.put('/:id',update);
router.get('/:id',single);
router.get('/',all);
router.delete('/:id',deleteVariant);

module.exports = router;
