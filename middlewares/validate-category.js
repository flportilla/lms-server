const { Category } = require("../models")
const { request, response } = require('express');

const isValidCategory = async (req = request, res = response, next) => {


    try {
        const category = req.body.category.toUpperCase()

        const validCategory = await Category
            .findOne({ name: `${category.toUpperCase()}` })

        if (!validCategory) {
            return res.status(400).json({
                msg: `The category ${category} doesn't exist on the DB - CATEGORY NOT FOUND`
            })
        }

        req.category = validCategory
        next()
    }
    catch (error) {
        res.status(400).json({
            msg: 'The category is invalid or missing'
        })
    }
}

module.exports = { isValidCategory }