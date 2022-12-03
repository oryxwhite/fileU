const mongoose = require('mongoose');

// const fileSchema = new mongoose.Schema({
//     filename: String,
//     mimetype: String,
//     location: String,
//     size: String
// })

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    files: [ new mongoose.Schema({
        filename: String,
        mimetype: String,
        location: String,
        size: String
    })]
});

// mongoose.model('File', fileSchema)
mongoose.model('User', UserSchema);