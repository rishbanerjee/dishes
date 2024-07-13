
const express = require('express');
const { getDishes, togglePublish } = require('../controllers/dishController');
const router = express.Router();

router.get('/dishes', getDishes);
router.post('/dishes/:id/toggle', togglePublish);

module.exports = router;
