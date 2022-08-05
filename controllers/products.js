const { request, response } = require('express');
const { Product } = require('../models')

const createProduct = async (req = request, res = response) => {

    const { status, user, ...body } = req.body

    //Generate data to save
    const productInfo = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user.id,
        category: req.category.id
    };

    const product = new Product(productInfo);

    //save data
    await product.save();

    res.status(201).json(product);

}

const getAllProducts = async (req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query

    //Query to search only {status: true} documents
    const query = { status: true }

    //Await for all promises to end before continue
    const [totalProducts, products] = await Promise.all([

        Product.countDocuments(query),
        Product
            .find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
    ]);

    res.json({
        totalProducts,
        products
    });
}

const getOneProductById = async (req = request, res = response) => {

    const { id } = req.params;

    const product = await Product
        .findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

    res.json(product)
}

const updateOneProductById = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, user, ...newInfo } = req.body;

    newInfo.category = req.category.id
    newInfo.name = newInfo.name.toUpperCase();
    newInfo.user = req.user.id

    const product = await Product
        .findByIdAndUpdate(id, newInfo, { new: true });

    res.json({
        product
    });

}

const deleteOneProductById = async (req = request, res = response) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true })

    res.json(product);

}

module.exports = {
    createProduct,
    getAllProducts,
    getOneProductById,
    updateOneProductById,
    deleteOneProductById
}