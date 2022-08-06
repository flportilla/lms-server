const { Router } = require('express')
const { check } = require('express-validator');
const { addQuestion } = require('../controllers/question');
const { isValidRole } = require('../helpers/db-validators');

const { fieldValidator, validateJWT, hasRole } = require('../middlewares')

const router = Router()

router.post('/', [
    validateJWT,
    check('statement', 'missing statement').not().isEmpty(),
    check('opt1', 'missing options').not().isEmpty(),
    check('opt2', 'missing options').not().isEmpty(),
    check('opt3', 'missing options').not().isEmpty(),
    check('opt4', 'missing options').not().isEmpty(),
    check('answer', 'missing answer').not().isEmpty(),
    hasRole('PROFESSOR_ROLE'),
    fieldValidator
], addQuestion);

module.exports = router