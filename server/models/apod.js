const mongoose = require('mongoose')
const Schema = mongoose.Schema

let apodSchema = new Schema({
    date: {
        type: String,
        requried: true,
        validate: {
            validator: async function unique(value) {
                let found = await Apod.findOne({ date: value.slice(0, 10) })
                console.log(found, '===============')
                if (found && found._id.toString() !== this._id.toString()) {
                    return false
                } else {
                    return true
                }
            },
            message: "this date already taken, please input another date."

        }
    },
    title: String,
    desc: String,
    url: String,
    mediaType: String
})


const axios = require('axios')

const baseUrl = 'https://api.nasa.gov/planetary/apod'
const apikey = process.env.APIKEY

apodSchema.pre('save', function (next) {
    axios
        .get(`${baseUrl}?date=${this.date}&&api_key=${apikey}`)
        .then(({ data }) => {
            this.title = data.title
            this.desc = data.explanation
            this.url = data.url
            this.mediaType = data.media_type
            next()
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

apodSchema.post('findOneAndUpdate', function (doc, next) {
    axios
        .get(`${baseUrl}?date=${doc.date}&&api_key=${apikey}`)
        .then(({ data }) => {
            doc.title = data.title
            doc.desc = data.explanation
            doc.url = data.url
            doc.mediaType = data.media_type
            doc.save()
            next()
        })
        .catch(err => {
            console.log(err)
            next()
        })
})




const Apod = mongoose.model('Apod', apodSchema)

module.exports = Apod