const { check } = require('express-validator')
const { Router } = require('express')

const {
    createProduct,
    getAllProducts,
    getOneProductById,
    updateOneProductById,
    deleteOneProductById
} = require('../controllers')

const { isExistingProduct, isProductNameUsed } = require('../helpers/db-validators')

const { validateJWT, fieldValidator, isValidCategory, isAdmin } = require('../middlewares')

const router = Router()

//Create a new product - private, token needed
router.post('/', [
    validateJWT,
    check('category', 'category is mandatory').not().isEmpty(),
    isValidCategory,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('name').custom(isProductNameUsed),
    fieldValidator
], createProduct);

//Get all products - public
router.get('/', getAllProducts)

//Get one product by ID - public
router.get('/:id', [
    check('id').custom(isExistingProduct),
    fieldValidator
], getOneProductById)

//Update one product by ID - private, token needed
router.put('/:id', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('name').custom(isProductNameUsed),
    check('category', 'Category is mandatory').not().isEmpty(),
    isValidCategory,
    check('id').custom(isExistingProduct),
    fieldValidator
], updateOneProductById)

//Delete (deactivate) one product by ID - Private, token and admin role needed
router.delete('/:id', [
    validateJWT,
    check('id').custom(isExistingProduct),
    isAdmin,
    fieldValidator
], deleteOneProductById)

module.exports = router