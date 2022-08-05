
const { Question, Professor, Answer } = require('../models')

const addQuestion = async (req, res) => {

    const { answer, opt1, opt2, opt3, opt4, statement } = req.body

    //Create data for model
    const newAnswerData = {
        answer,
    }
    const newAnswer = new Answer(newAnswerData)

    const newQuestionData = {
        statement,
        opt1, opt2, opt3, opt4,
        user: req.user.id,
        answer: newAnswer.id
    }

    const newQuestion = new Question(newQuestionData)
    const [savedQuestion, savedAnswer] = await Promise.all([
        newQuestion.save(),
        newAnswer.save(),
    ]);

    res.json({
        savedQuestion,
        savedAnswer
    })
}

//TODO: Show questions with answer populated

module.exports = {
    addQuestion
}