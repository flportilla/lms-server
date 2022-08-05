const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({

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

});

CategorySchema.methods.toJSON = function () {
    const { __v, _id, status, ...category } = this.toObject();
    category.id = _id
    return category
}

module.exports = model('Category', CategorySchema)
