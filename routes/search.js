const { Router } = require('express');
const { searchs } = require('../controllers');

const router = Router();

router.get('/:collection/:searchTerm', searchs)

module.exports = router