const { Schema, model } = require('mongoose')

const ProfessorSchema = new Schema({
    name:
    {
        type: String,
        required: [true, 'Name is mandatory']
    },
    email:
    {
        type: String,
        required: [true, 'Email is mandatory'],
        unique: true
    },
    password:
    {
        type: String,
        required: [true, 'Password is mandatory']
    },
    picture: String,
    role:
    {
        type: String,
        required: [true, 'Role is mandatory'],
        default: "PROFESSOR_ROLE"
    },
    status:
    {
        type: Boolean,
        default: true
    },
    google:
    {
        type: Boolean,
        default: false
    },
    questions:
    {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    tests:
    {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },
    students:
    {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
});

ProfessorSchema.methods.toJSON = function () {
    const { __v, _id, ...professor } = this.toObject();
    professor.uid = _id
    return professor
}

module.exports = model('Professor', ProfessorSchema);
