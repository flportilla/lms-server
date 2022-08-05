const { v4: uuidv4 } = require('uuid');
const path = require('path')

const defaultExtensions = ['png', 'jpg', 'jpeg', 'gif']

const uploadFiles = (files, validExtensions = defaultExtensions, folder = '') => {

    return new Promise((resolve, reject) => {

        const file = files.file ? files.file : '';
        if (!file) {
            return reject(`File is missing, please add a file to upload`);
        }

        //Get the extension
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];

        //Validate allowed extensions
        if (!validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not supported ${validExtensions}`);
        }

        const tempName = uuidv4() + "." + extension;

        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

        file.mv(uploadPath, function (err) {
            if (err) {
                return reject(err);
            }

            resolve(tempName);
        });
    });

}

module.exports = uploadFiles