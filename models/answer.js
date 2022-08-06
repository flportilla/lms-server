const { model, Schema } = require('mongoose')

const AnswerSchema = new Schema({
    answer: {
        type: String,
        required: true
    },

})

AnswerSchema.methods.toJSON = function () {
    const { __v, _id, ...answer } = this.toObject();
    answer.id = _id
    return answer
}

module.exports = model('Answer', AnswerSchema)