const { request, response } = require('express');
const { Category } = require('../models');

const createCategory = async (req = request, res = response) => {

    const name = req.body.name.toUpperCase();

    //Generate data to save
    const categoryInfo = {
        name,
        user: req.user.id
    };

    //save data
    const category = new Category(categoryInfo);
    await category.save();

    res.status(201).json(category);

}

const getAllCategories = async (req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query

    //Query to search only {status: true} documents
    const query = { status: true }

    //Await for all promises to end before continue
    const [totalCategories, categories] = await Promise.all([

        Category.countDocuments(query),
        Category
            .find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', 'name')
    ]);

    res.json({
        totalCategories,
        categories
    });
}

const getOneById = async (req = request, res = response) => {

    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'name');

    res.json(category)
}

const updateOneById = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, user, ...newInfo } = req.body;

    newInfo.name = newInfo.name.toUpperCase();
    newInfo.user = req.user.id

    const category = await Category
        .findByIdAndUpdate(id, newInfo, { new: true });

    res.json(category);
}

const desactivateOneById = async (req = request, res = response) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json(category);
}

module.exports = {
    createCategory,
    getAllCategories,
    getOneById,
    updateOneById,
    desactivateOneById
}