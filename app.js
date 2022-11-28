const express = require('express');
const app = express();
const cors = require('cors');
const upload = require('./middleware/multer')
const passport = require('passport')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('./config/db')
require('./models/user');

require('./config/passport')(passport);

app.use(passport.initialize())

app.use(require('./routes'));



app.post('/upload', upload.single('file'), (req, res) => {

    console.log(req.file.filename)
    
    res.json()
})


app.listen(4000, () => {
    console.log("listening at localhost:4000")
})