const { Router } = require('express')
const { check } = require('express-validator')
const {
    createCategory,
    getAllCategories,
    getOneById,
    updateOneById,
    desactivateOneById
} = require('../controllers')
const {
    isExistingCategory,
    isCategoryNameUsed } = require('../helpers/db-validators')

const {
    fieldValidator,
    validateJWT,
    isAdmin }
    = require('../middlewares')

const router = Router()

//Get all categories - public
router.get('/', getAllCategories)

//Get one categorie by id - public
router.get('/:id', [
    check('id').custom(isExistingCategory),
    fieldValidator
], getOneById)

//Create one category - private, token needed
router.post('/', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('name').custom(isCategoryNameUsed),
    fieldValidator
], createCategory)

//update one category by id - private, token needed
router.put('/:id', [
    validateJWT,
    check('id').custom(isExistingCategory),
    check('name', 'Name is mandatory').not().isEmpty(),
    check('name').custom(isCategoryNameUsed),
    fieldValidator
], updateOneById)

//delete one category by id - private, only ADMIN_ROLE
router.delete('/:id', [
    validateJWT,
    check('id').custom(isExistingCategory),
    isAdmin,
    fieldValidator
], desactivateOneById)

module.exports = router