const Apod = require('../models/apod')
const axios = require('axios')
const token = require('../helpers/token')

const baseUrl = 'https://api.nasa.gov/planetary/apod'
const apikey = process.env.APIKEY


module.exports = {
    apodList(req, res) {
        Apod
            .find({})
            .then(apods => {
                res.status(200).json(apods)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    find(req, res) {
        Apod
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    res.status(200).json(found)
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    create(req, res) {
        Apod
            .create({
                date: req.body.date,
            })
            .then(created => {
                res.status(201).json(created)
            })
            .catch(err => {
                if (err.errors.date) {
                    res.status(400).json({
                        msg: err.errors.date.message
                    })
                } else {

                    res.status(500).json({
                        msg: err.message
                    })
                }
            })
    },

    update(req, res) {
        Apod
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Apod
                        .findOneAndUpdate({ _id: req.params.id }, {
                            date: req.body.date
                        }, { new: true })
                }
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },

    delete(req, res) {
        Apod
            .findById(req.params.id)
            .then(found => {
                if (!found) {
                    res.status(404).json({
                        msg: 'not Found.'
                    })
                } else {
                    return Apod
                        .findByIdAndDelete(req.params.id)
                }
            })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    },
}