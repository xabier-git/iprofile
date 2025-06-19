const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/list', profileController.list);
router.post('/add', profileController.add);
router.put('/:id', profileController.update);
router.delete('/:id', profileController.delete);

module.exports = router;