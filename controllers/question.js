
const { Question, Answer } = require('../models')

const addQuestion = async (req, res) => {

    const { answer, opt1, opt2, opt3, opt4, statement } = req.body

    const newAnswer = new Answer({ answer })

    const newQuestionData = {
        statement,
        opt1, opt2, opt3, opt4,
        user: req.user.id,
    }

    const newQuestion = new Question(newQuestionData)
    newQuestion.answer = newQuestion.answer.concat(newAnswer.id)

    const [savedQuestion, savedAnswer] = await Promise.all([
        newQuestion.save(),
        newAnswer.save(),
    ]);

    res.json({
        question: savedQuestion,
        answer: savedAnswer
    })
}

const getAllQuestions = async (req, res) => {

    const allQuestions = await Question.find()
    res.json(allQuestions)
}

module.exports = {
    addQuestion,
    getAllQuestions
}