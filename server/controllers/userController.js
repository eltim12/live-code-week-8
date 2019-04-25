const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const token  = require('../helpers/token')

module.exports = {

    create(req, res) {
        User
            .create({
                email: req.body.email,
                password: req.body.password,
            })
            .then(createdUser => {
                res.status(201).json(createdUser)
            })
            .catch(err => {
                if (err.errors.email) {
                    res.status(400).json({
                        msg: err.errors.email.message
                    })
                } else if (err.errors.password) {
                    res.status(400).json({
                        msg: err.errors.password.message
                    })
                } else {
                    res.status(500).json('internal server error')
                }
            })
    },

    find(req, res) {
        User
            .findById(req.params.id)
            .then(foundUser => {
                if (foundUser) {
                    res.status(200).json(foundUser)
                } else {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                }

            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    update(req, res) {
        User
            .findById(req.params.id)
            .then(foundUser => {
                if (!foundUser) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return User
                        .findByIdAndUpdate(req.params.id, req.body, { new: true })
                }
            })
            .then(updatedUser => {

                res.status(200).json(updatedUser)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    delete(req, res) {
        User
            .findById(req.params.id)
            .then(foundUser => {
                if (!foundUser) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return User
                        .findByIdAndDelete(req.params.id)
                }
            })
            .then(deletedUser => {
                res.status(200).json(deletedUser)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    login(req, res) {
        User
            .findOne({
                email: req.body.email,
            })
            .then(found => {
                if (!found) {
                    throw new Error(401)
                } else {
                    if (bcrypt.compare(req.body.password, found.password) === true) {
                        let payload = {
                            name: found.name,
                            email: found.email,
                            userId: found._id
                        }
                        let accessToken = token.sign(payload)
                        res.status(200).json({
                            accessToken,
                        })
                    } else {
                        throw new Error(401)
                    }
                }
            })
            .catch(err => {
                if (err.message == "401") {
                    res.status(401).json({
                        msg: 'email/password wrong.'
                    })
                } else {
                    res.status(500).json({
                        msg: 'internal server error'
                    })
                }
            })
    },
    verify(req, res) {
        try {
            const tokenCheck = token.verify(req.headers['access-token'])
            res.status(200).json({
                msg: 'user authenticated',
                info: tokenCheck
            })
        } catch (err) {
            console.log(err)
            res.status(401).json({
                msg: 'user not authenticated'
            })
        }
    },
}