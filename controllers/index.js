const authController = require('../controllers/auth')
const categoriesController = require('../controllers/categories')
const productsController = require('../controllers/products')
const searchsController = require('../controllers/searchs')
const usersController = require('../controllers/users')

module.exports = {
    ...authController,
    ...categoriesController,
    ...productsController,
    ...searchsController,
    ...usersController
}