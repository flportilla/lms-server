const { Schema, model } = require('mongoose')

const QuestionSchema = new Schema({

    statement: {
        type: String,
        required: [true, 'statement is mandatory'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    opt1: {
        type: String,
        required: [true, 'option 1 is mandatory'],
    },
    opt2: {
        type: String,
        required: [true, 'option 2 is mandatory'],
    },
    opt3: {
        type: String,
        required: [true, 'option 3 is mandatory'],
    },
    opt4: {
        type: String,
        required: [true, 'option 4 is mandatory'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Professor',
        required: true
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
    }

});

QuestionSchema.methods.toJSON = function () {
    const { __v, _id, status, ...question } = this.toObject();
    question.id = _id
    return question
}

module.exports = model('Question', QuestionSchema)
