const { response } = require("express");
const { User, Category, Product } = require("../models");
const { ObjectId } = require('mongoose').Types

const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users',
];

const searchUsers = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term) //TRUE

    if (isMongoId) {
        const user = await User.findById(term)
        return res.json({
            results: (user) ? [user] : []
        })
    };

    const regexp = new RegExp(term, 'i')

    const users = await User.find({
        $or: [
            { name: regexp },
            { email: regexp },
        ],
        $and: [
            { status: true },
        ]
    });
    const total = await User.count({
        $or: [
            { name: regexp },
            { email: regexp },
        ],
        $and: [
            { status: true },
        ]
    });

    res.json({
        total: total,
        results: users
    })

}

const searchCategories = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term) //TRUE

    if (isMongoId) {
        const category = await Category.findById(term)
        return res.json({
            results: (category) ? [category] : []
        })
    };

    const regexp = new RegExp(term, 'i');

    const category = await Category.find({
        status: true,
        name: regexp
    });
    const total = await Category.count({
        status: true,
        name: regexp
    });

    res.json({
        total,
        category
    })
}

const searchProducts = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term) //TRUE

    if (isMongoId) {
        const product = await Product
            .findById(term)
            .populate('category', 'name')
        return res.json({
            results: (product) ? [product] : []
        })
    };

    const regexp = new RegExp(term, 'i');

    const product = await Product.find({
        status: true,
        name: regexp
    }).populate('category', 'name')

    const total = await Product.count({
        status: true,
        name: regexp
    });

    res.json({
        total,
        product
    })
}


const searchs = (req, res = response) => {


    const { collection, searchTerm } = req.params

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The collections allowed are: ${allowedCollections}`
        })
    }

    switch (collection) {

        case 'users':
            searchUsers(searchTerm, res)
            break;
        case 'categories':
            searchCategories(searchTerm, res)
            break;
        case 'products':
            searchProducts(searchTerm, res)
            break;

        default:
            res.status(500).json({
                msg: 'This search is not set yet'
            })
    }
}

module.exports = {
    searchs
}