const { Router } = require('express')
const { check } = require('express-validator')

const { uploadFile, getFiles, updateFilecloudinary } = require('../controllers/uploads')

const { allowedCollections } = require('../helpers/db-validators')

const { fieldValidator, validateUploadFile } = require('../middlewares')

const router = Router()

router.post('/', validateUploadFile, uploadFile)

router.put('/:collection/:id', [
    validateUploadFile,
    check('id', "This isn't a valid Mongoose ID").isMongoId(),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),
    fieldValidator
], updateFilecloudinary)

router.get('/:collection/:id', [
    check('id', "This isn't a valid Mongoose ID").isMongoId(),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),
    fieldValidator
], getFiles)

module.exports = router