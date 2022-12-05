const express = require('express');
const app = express();
const cors = require('cors');
// const upload = require('./middleware/multer')
const passport = require('passport')
// const AWSupload = require('./config/aws')
// const fs = require('fs')
// const s3 = require('./config/aws')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('./config/db')
require('./models/user');

require('./config/passport')(passport);

app.use(passport.initialize())

app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'tsclient/dist')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/tsclient/dist/index.html'));
});


// app.post('/upload', upload.single('file'), async (req, res) => {
//     console.log(req.file.filename)
//     const file = fs.readFileSync(req.file.path)
//     s3.upload({
//         Bucket: process.env.S3_BUCKET,
//         Key: req.file.filename,
//         Body: file,
//     }, (err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(data.Location)
            

//             res.json(data.Location)
//         }
//     })


// })


app.listen(4000, () => {
    console.log("listening at localhost:4000")
})