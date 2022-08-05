const dbValidators = require('./db-validators')
const googleVerify = require('./google-verify')
const jwtGenerator = require('./jwt-generator')
const uploadFiles = require('../helpers/upload-file')

module.exports = {
    ...dbValidators,
    ...googleVerify,
    ...jwtGenerator,
    ...uploadFiles
}