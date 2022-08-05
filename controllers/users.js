const { User } = require('../models')
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    const { from = 0, limit = 5 } = req.query
    const query = { status: true }

    const [totalUsers, users] = await Promise.all([

        User.countDocuments(query),
        User
            .find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({ totalUsers, users });
};

const putUsers = async (req, res) => {
    const { id } = req.params

    const { _id, password, google, ...newInfo } = req.body

    if (password) {
        //Ecrypt password
        const salt = bcrypt.genSaltSync()
        newInfo.password = bcrypt.hashSync(password, salt)
    }
    const user = await User.findByIdAndUpdate(id, newInfo)

    res.status(202).json(user)
};

const postUsers = async (req, res) => {

    const { name, email, password, role } = req.body
    const user = new User({
        name, email, password, role,
    })

    //Ecrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()
    res.status(201).json({
        user
    })

};

const deleteUsers = async (req, res) => {

    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { status: false })
    res.json(user);

};

module.exports = { getUsers, putUsers, postUsers, deleteUsers }
