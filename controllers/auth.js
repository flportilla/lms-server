const { response } = require("express")
const bcryptjs = require('bcryptjs')

const { User } = require('../models')

const { tokenGenerator } = require("../helpers/jwt-generator")
const googleVerify = require("../helpers/google-verify")

const login = async (req, res = response) => {

    const { email, password } = req.body

    try {
        //Verify if email exist
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "User or password is incorrect - EMAIL"
            })
        }

        //Verify user status
        if (!user.status) {
            return res.status(400).json({
                msg: "User or password is incorrect - STATUS: FALSE"
            })
        }

        //Verify password
        const isValidPassword = bcryptjs.compareSync(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({
                msg: "User or password is incorrect - PASSWORD"
            })
        }

        //Generate token
        const token = await tokenGenerator(user.id)

        res.json({
            response: 'Succesfully logged in',
            user,
            token
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}

const googleSingIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, email, picture } = await googleVerify(id_token)

        let user = await User.findOne({ email })

        //If the user doesn't exist, create one in DB
        if (!user) {
            const newUserInfo = {
                name,
                email,
                picture,
                password: "123456",
                google: true
            }
            user = new User(newUserInfo);

            await user.save()
        }

        //If the user was desactivated, prevent the login
        if (!user.status) {
            return res.status(401).json({
                msg: 'Blocked user, talk to the administrator'
            })
        }

        //Generate token
        const token = await tokenGenerator(user.id)

        res.json({
            user,
            token
        })

    }
    catch (error) {

        console.error(error)
        res.status(400).json({
            msg: "It wasn't possible to verify the token"
        })
    }
}

module.exports = {
    login,
    googleSingIn
}   