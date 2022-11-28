const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');

const api = require('./routes/upload.routes')

// mongoose
//     .connect()
//     .then(console.log('connected to mongodb'))
//     .catch((err) => {
//         console.error('error connecting to mongodb', err.reason)
//     })

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors())
app.use('/api', api)
app.use('/uploads', express.static('uploads'))

app.listen(4000, () => {
    console.log('running on port 4000')
})

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});