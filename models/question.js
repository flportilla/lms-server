const { model, Schema } = require('mongoose')

const QuestionSchema = new Schema({
    statement: {
        type: String,
        required: true
    },
    opt1: {
        type: String,
        required: true
    },
    opt2: {
        type: String,
        required: true
    },
    opt3: {
        type: String,
        required: true
    },
    opt4: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Professor'
    },
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }
})

QuestionSchema.methods.toJSON = function () {
    const { __v, _id, ...question } = this.toObject();
    question.id = _id
    return question
}

module.exports = model('Question', QuestionSchema)