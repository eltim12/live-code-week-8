const color = require('colors')
const User = require('../models/user')
const Apod = require('../models/apod')
const token = require('../helpers/token')

module.exports = {

    authenticate: function (req, res, next) {
        console.log('authenticating...'.red)
        try {
            const tokenCheck = token.verify(req.headers['access-token'])

            req.authenticated = tokenCheck
            console.log('user authenticated!'.green.bold)
            next()
        } catch (err) {
            res.status(400).json({
                msg: 'Invalid access token'
            })
        }
    },

    authorization: function (req, res, next) {
        console.log('authorizing...'.red)
        Apod
            .findById(req.params.id)
            .then(found => {
                // console.log(found, 'ini found==========')
                // next()
                if (found.userId.toString() === req.authenticated.userId.toString()) {
                    console.log('user authorized!'.green.bold)
                    next()
                } else {
                    res.status(400).json({
                        msg: 'not allowed!'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
}   