const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is mandatory'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Status is mandatory']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is mandatory']
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    picture: {
        type: String
    }

});

ProductSchema.methods.toJSON = function () {
    const { __v, _id, status, ...product } = this.toObject();
    product.id = _id
    return product
}

module.exports = model('Product', ProductSchema)
