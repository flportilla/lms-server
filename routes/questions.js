const { Router } = require('express')
const { check } = require('express-validator');
const { addQuestion, getAllQuestions } = require('../controllers/question');

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

router.get('/', [
    validateJWT,
    hasRole('PROFESSOR_ROLE'),
    fieldValidator
], getAllQuestions);

module.exports = router