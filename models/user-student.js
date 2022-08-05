const { Schema, model } = require('mongoose')

const StudentSchema = new Schema({
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
        default: "STUDENT_ROLE"
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
    testsTaken: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Results'
        }
    ],
    testsAssigned: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Test'
        }
    ],
});

StudentSchema.methods.toJSON = function () {
    const { __v, _id, ...student } = this.toObject();
    student.uid = _id
    return student
}

module.exports = model('Student', StudentSchema);
