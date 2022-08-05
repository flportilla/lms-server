const { response, request } = require('express')
const { User } = require('../models')
const jwt = require('jsonwebtoken')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header("flserv-token");
    if (!token) {
        return res.status(401).json({
            msg: 'The token is invalid or missing'
        })
    }

    try {

        //get id from token
        const { uid } = jwt.verify(token, process.env.SECRET);

        //search user on DB
        const user = await User.findById(uid)
        if (!user) {
            return res.status(401).json({
                msg: "Token invalid - NO EXISTING USER ON DB"
            })
        }

        //Validate active user
        if (!user.status) {
            return res.status(401).json({
                msg: "Token invalid - INACTIVE USER"
            })
        }

        req.uid = uid
        req.user = user

        next();
    }

    catch (error) {
        console.error(error)

        res.status(401).json({
            msg: 'The token is invalid or missing'
        })
    }
}

module.exports = {
    validateJWT
}