const express = require('express');
const router = express.Router();
const primeController = require('../controllers/prime.controller');

router.get('/', primeController.getAllPrimes);
router.get('/employee/:id', primeController.getPrimesByEmployee);
router.post('/', primeController.createPrime);
router.put('/:id', primeController.updatePrime);
router.delete('/:id', primeController.deletePrime);

module.exports = router;
