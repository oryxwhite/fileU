const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file.filename)
    res.json()
})

app.listen(4000, () => {
    console.log("listening at localhost:4000")
})