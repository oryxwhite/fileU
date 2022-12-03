const mongoose = require('mongoose')
const { stringify } = require('uuid')

const fileSchema = new mongoose.Schema({
    filename: String,
    mimetype: String,
    location: String,
    size: String
})

mongoose.model