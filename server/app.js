require("dotenv").config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)

mongoose.connect(`mongodb://localhost/from-nasa-with-love`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const indexRoutes = require('./routes/index')

app.use('/', indexRoutes)

app.listen(port, () => {
    console.log("listening on port" + port)
})
