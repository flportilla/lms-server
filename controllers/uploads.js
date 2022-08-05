
const fs = require('fs')
const path = require('path')

const { response, request } = require("express");

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const uploadFiles = require("../helpers/upload-file");

const { User, Product } = require('../models');

const uploadFile = async (req = request, res = response) => {

    try {

        // const fileName = await uploadFiles(req.files, ['pdf'], 'pdf');
        const fileName = await uploadFiles(req.files, undefined, 'imgs');
        res.json({ msg: `file name: ${fileName}` })
    }

    catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

const updateFile = async (req = request, res = response) => {

    const { collection, id } = req.params
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `The user with the ID: ${id} doesn't exist on the DB`
                });

            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `The product with the ID: ${id} doesn't exist on the DB`
                })
            }
            break;

        default:
            res.status(500).json({
                msg: 'This is not working yet'
            })
            break;
    }

    //Clean previous pictures

    try {
        if (model.picture) {

            const picPath = path.join(__dirname, '../uploads', collection, model.picture);

            if (fs.existsSync(picPath)) {
                return fs.unlinkSync(picPath)
            }
        }
    }
    catch (error) {
        res.status(400).json({
            msg: `Something went wrong' + ${error}`
        })
    }

    //undefined = default extensions: jpg, jpeg, png, gif
    const name = await uploadFiles(req.files, undefined, collection);

    model.picture = name;
    await model.save()

    res.json({
        model
    })
}

const getFiles = async (req = request, res = response) => {

    const { collection, id } = req.params
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `The user with the ID: ${id} doesn't exist on the DB`
                });

            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `The product with the ID: ${id} doesn't exist on the DB`
                })
            }
            break;

        default:
            res.status(500).json({
                msg: 'This is not working yet'
            })
            break;
    }

    if (model.picture) {

        return res.json({
            urlPic: model.picture
        })
    }

    const noImagePath = path.join(__dirname, '../assets/no-image.jpg')
    return res.sendFile(noImagePath);

}

const updateFilecloudinary = async (req = request, res = response) => {

    const { collection, id } = req.params
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)

            if (!model) {
                return res.status(400).json({
                    msg: `The user with the ID: ${id} doesn't exist on the DB`
                });

            }
            break;
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `The product with the ID: ${id} doesn't exist on the DB`
                })
            }
            break;

        default:
            res.status(500).json({
                msg: 'This is not working yet'
            })
            break;
    }

    //Clean previous pictures
    if (model.picture) {

        //Get the public id from the URL
        const picNameArr = model?.picture.split('/')
        const name = picNameArr[picNameArr.length - 1]
        const [public_id] = name.split('.')

        //remove previous picture from cloudinary
        cloudinary.uploader.destroy(public_id)

    }

    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    model.picture = secure_url;
    await model.save()

    res.json({ model })

}

module.exports = {
    uploadFile,
    updateFile,
    getFiles,
    updateFilecloudinary
}