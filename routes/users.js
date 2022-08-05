const { Router } = require('express')
const { check } = require('express-validator')

const {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
} = require('../controllers')
const {
    isValidRole,
    isEmailDuplicated,
    isExistingUser
} = require('../helpers/db-validators')

const {
    fieldValidator,
    validateJWT,
    hasRole
} = require('../middlewares')

const router = Router()

router.get('/', getUsers);

router.put('/:id',
    [
        check('id').custom(isExistingUser),
        check('role').custom(isValidRole),
        fieldValidator
    ],
    putUsers);

router.post('/',
    [
        // check('role', 'Is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('name', 'Name is mandatory').not().isEmpty(),
        check('password', 'Password is mandatory and longer that 5 characters').isLength({ min: 5 }),
        check('email', 'Invalid email').isEmail(),
        check('email').custom(isEmailDuplicated),
        check('role').custom(isValidRole),
        fieldValidator
    ],
    postUsers);

router.delete('/:id',
    [
        validateJWT,
        hasRole('ADMIN_ROLE'),
        check('id').custom(isExistingUser),
        fieldValidator,
    ],
    deleteUsers);

module.exports = router;
