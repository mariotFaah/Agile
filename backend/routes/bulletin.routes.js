const express = require('express');
const router = express.Router();
const bulletinController = require('../controllers/bulletin.controller');

router.get('/', bulletinController.getAllBulletins);
router.get('/employee/:id', bulletinController.getBulletinsByEmployee);
router.post('/generate', bulletinController.generateBulletin);

module.exports = router;
