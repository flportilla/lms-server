const validateFields = require('../middlewares/field-validator')
const validateJWT = require('../middlewares/validate-jtw')
const validateRoles = require('../middlewares/validate-role')
const validateCategory = require('../middlewares/validate-category')
const validateUploadFile = require('../middlewares/validate-file')

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateCategory,
    ...validateUploadFile
}
