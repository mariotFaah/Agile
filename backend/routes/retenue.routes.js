const express = require('express');
const router = express.Router();
const retenueController = require('../controllers/retenue.controller');

router.get('/', retenueController.getAllRetenues);
router.get('/employee/:id', retenueController.getRetenuesByEmployee);
router.post('/', retenueController.createRetenue);
router.put('/:id', retenueController.updateRetenue);
router.delete('/:id', retenueController.deleteRetenue);

module.exports = router;
