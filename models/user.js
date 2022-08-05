const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
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
        default: "USER_ROLE"
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
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...user } = this.toObject();
    user.uid = _id
    return user
}

module.exports = model('User', UserSchema);
